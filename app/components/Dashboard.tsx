/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-17 21:47:20
 * @FilePath: /dedata-front/app/components/Dashboard.tsx
 * @Description: 默认进来先判断是否有pending的onchain
 */
'use client';

import { message } from 'antd';
import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useEffect, useCallback } from 'react';
import { getSummaryInfo, updatePoints, getPendingOnchainTransactions } from '@/app/lib/api';
import { SUCCESS_CODE } from '@/app/utils/constant';
import useNonce from '@/app/hooks/useNonce';
import useOnchainPoints from '@/app/hooks/useOnchainPoints';
import { contractABI, contractAddress } from '@/app/utils/contractABI';
import { parseEther } from 'viem';

function Dashboard({ applyStatus }: any) {
	const [userInfo, setUserInfo] = useState({
		totalCompletedCases: 0,
		onchainCases: 0,
		totalPoints: '0',
		onchainPoints: '0',
	});
	// 判断是否有pending的onchain
	const { hasPendingOnchain, setHasPendingOnchain } = useState(false);
	const { pendingInfo, setPendingInfo } = useState({});
	const { address, isConnected } = useAccount();
	const nonce = useNonce(address);
	const { signMessageAsync } = useSignMessage();
	const { error, isPending, isSuccess, writeContract } = useWriteContract();

	useEffect(() => {
		console.log('Transaction isPending:', isPending);
		console.log('Transaction isSuccess:', isSuccess);
		console.log('Transaction error:', error);
		if (isPending && !isSuccess) {
			// 开始执行上链
		}
		if (isSuccess && !isPending) {
			// 上链成功
		}
	}, [isPending, isSuccess, error]);

	/**
	 * 需要判断是否有pending的上链操作
	 */
	const getPendingChain = useCallback(async () => {
		const { code, msg, data } = await getPendingOnchainTransactions(address);
		console.log('------->getPendingChain', data);
		if (code === SUCCESS_CODE) {
			if (data && !data.length) return null;
			const points = data.map((v: any) => {
				const { points, cases } = v;
				return {
					tasks: cases,
					nonce: nonce,
					points: BigInt(Number(points)) * BigInt(1000000000000000000),
				};
			});
			const oracleSignature = data[0].oracleSignature;
			setPendingInfo({
				points,
				oracleSignature,
			});
		} else {
			setPendingInfo({});
		}
	}, [nonce, address, setPendingInfo]);

	useEffect(() => {
		async function loadData() {
			const result = await getSummaryInfo(address);
			console.log(result);
			setUserInfo(result.data);
		}
		if (address && !applyStatus) {
			loadData();
			getPendingChain();
		}
	}, [address, applyStatus, getPendingChain]);

	async function onChain() {
		const pendingPoints = userInfo.totalPoints - userInfo.onchainPoints;
		const pendingCases = userInfo.totalCompletedCases - userInfo.onchainCases;
		if (pendingPoints <= 0 && pendingCases <= 0) return;
		const pendingArr = Object.Keys(pendingInfo);
		console.log(pendingArr);
		let oracleSignature = '';
		let points = [];
		if (pendingArr.length === 0) {
			const chainData = await onChainUpdate();
			oracleSignature = chainData.oracleSignature;
			points = [
				{
					tasks: chainData.cases,
					nonce: nonce,
					points: BigInt(Number(chainData.points) * 1000000000000000000),
				},
			];
		} else {
			oracleSignature = pendingData.oracleSignature;
			points = pendingData.points;
		}
		console.log(oracleSignature, points);
		const contractConfig: any = {
			functionName: 'addPoints',
			address: contractAddress,
			abi: contractABI,
			args: [address, ...points, oracleSignature],
		};
		console.log(contractConfig);
		writeContract(contractConfig);
	}
	async function onChainUpdate() {
		const signatureStr = `nonce: ${nonce}`;
		const signature = await signMessageAsync({
			message: signatureStr,
		});

		const body = {
			nonce: `${nonce}`,
			address,
			signature,
		};
		const { code, msg, data } = await updatePoints(body);
		if (code === SUCCESS_CODE) {
			return data;
		} else {
			message.error(msg);
			throw new Error(msg);
		}
	}

	return (
		<div className="flex flex-col h-[1.5rem] w-full bg-[#fff] rounded-[0.16rem] mb-[0.24rem] px-[0.24rem] py-[0.18rem]">
			<span className="text-[0.16rem] font-bold text-[#000] mb-[0.1rem] leading-[0.21rem]">Dashboard</span>

			<div className="flex justify-around items-start">
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.24rem] text-[#000] leading-[0.32rem] h-[0.32rem]">
						{address && userInfo ? userInfo.totalCompletedCases : '-'}
					</span>
					<span className="text-[0.16rem] text-[#999] leading-[0.21rem]">Total Cases</span>
				</div>
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.24rem] text-[#000] leading-[0.32rem] h-[0.32rem]">
						<span>
							Cases:&nbsp;&nbsp;
							{address && userInfo ? userInfo.totalCompletedCases - userInfo.onchainCases : '-'}
						</span>
						<span className="ml-[0.4rem]">
							Points:&nbsp;&nbsp;
							{address && userInfo ? Number(userInfo.totalPoints) - Number(userInfo.onchainPoints) : '-'}
						</span>
					</span>
					<span className="text-[0.16rem] text-[#999] leading-[0.21rem]">Pending Submits</span>
					<span
						className="text-[0.14rem] leading-[0.24rem] bg-[#EFF7FF] mt-[0.1rem] h-[0.24rem] px-[0.1rem] text-[#3A54DF] rounded-[0.16rem] cursor-pointer"
						onClick={onChain}
					>
						{hasPendingOnchain ? 'Retry' : 'Submit batch onChain'} &gt;
					</span>
				</div>
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.24rem] text-[#000] leading-[0.32rem] h-[0.32rem]">
						{address && userInfo ? userInfo.onchainCases : '-'}
					</span>
					<span className="text-[0.16rem] text-[#999] leading-[0.21rem]">Total Submits onChain</span>
				</div>
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.24rem] text-[#000] leading-[0.32rem] h-[0.32rem]">
						{address && userInfo ? Number(userInfo.totalPoints).toFixed() : '-'}
					</span>
					<span className="text-[0.16rem] text-[#999] leading-[0.21rem]">Points</span>
				</div>
			</div>
		</div>
	);
}
export default Dashboard;

/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-28 23:36:30
 * @FilePath: /dedata-front/app/components/Dashboard.tsx
 * @Description: when entering, first determine whether there is a pending onchain.
 */
'use client';

import { message } from 'antd';
import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt, useTransactionCount } from 'wagmi';
import { useState, useEffect, useCallback } from 'react';
import { getSummaryInfo, updatePoints, getPendingOnchainTransactions } from '@/app/lib/api';
import { SUCCESS_CODE } from '@/app/utils/constant';
import useNonceRefetch from '@/app/hooks/useNonceRefetch';
import useOnchainPoints from '@/app/hooks/useOnchainPoints';
import { contractABI, contractAddress } from '@/app/utils/contractABI';
import { DOnchain, OnchainStatus } from '@/app/types/index';
function Dashboard({ applyStatus }: any) {
	const [userInfo, setUserInfo] = useState({
		totalCompletedCases: 0,
		onchainCases: 0,
		totalPoints: '0',
		onchainPoints: '0',
	});
	// check has pending onchain
	const [onchainStatus, setOnchainStatus] = useState<OnchainStatus>(0);
	const { address, isConnected } = useAccount();
	const { signMessageAsync } = useSignMessage();
	const { data, isPending, isSuccess, isPaused, error: writerError, writeContractAsync } = useWriteContract();
	const { nonce, getNonce } = useNonceRefetch(address, 5000);
	const {
		isLoading: isWaiting,
		isSuccess: isConfirmed,
		error,
	} = useWaitForTransactionReceipt({
		hash: data,
		confirmations: 7,
	});
	const { data: lastSuccessNonce } = useTransactionCount({
		address,
	});
	const { data: latestNonce } = useTransactionCount({
		address,
		blockTag: 'latest',
	});
	const { data: pendingNonce } = useTransactionCount({
		address,
		blockTag: 'pending',
	});
	const loadData = useCallback(async () => {
		const result = await getSummaryInfo(address);
		// console.log('------>loadData', result);
		setUserInfo(result.data);
	}, [address]);
	/**
	 * check has pending in onchain
	 */
	const getPendingChain = useCallback(async () => {
		const { code, msg, data } = await getPendingOnchainTransactions(address);
		// console.log('------->getPendingChain', data);
		if (code === SUCCESS_CODE && data.length) {
			const points = data.map((v: any) => {
				const { points, cases } = v;
				return {
					tasks: cases,
					nonce: nonce,
					points: BigInt(Number(points) * 10) * BigInt(100000000000000000),
				};
			});
			const oracleSignature = data[0].oracleSignature;
			console.log(nonce, lastSuccessNonce, latestNonce, pendingNonce);
			// last success nonce is equal to nonce
			if (lastSuccessNonce !== undefined && BigInt(lastSuccessNonce) >= nonce) {
				setOnchainStatus(3);
			} else {
				setOnchainStatus(1);
			}
			return {
				points,
				oracleSignature,
			};
		} else {
			setOnchainStatus(0);
			return {
				points: [],
				oracleSignature: '',
			};
		}
	}, [nonce, address, lastSuccessNonce, latestNonce, pendingNonce]);

	useEffect(() => {
		if (isPending) {
			console.log('Confirming...');
		}
		if (isSuccess) {
			console.log('Transaction confirmed.');
		}
		if (isPaused) {
			console.log('Transaction isPaused.');
		}
		if (writerError) {
			console.log('Transaction error:', writerError);
			setOnchainStatus(3);
		}
	}, [isPending, isPaused, isSuccess, writerError]);

	useEffect(() => {
		if (isWaiting) {
			console.log('Waiting for confirmation...');
			setOnchainStatus(1);
		}
		if (isConfirmed) {
			console.log('Transaction confirmed.');
			setOnchainStatus(2);
			loadData();
		}
		if (error) {
			console.log('Transaction failed:', error);
			setOnchainStatus(3);
		}
	}, [isWaiting, isConfirmed, loadData, error]);

	useEffect(() => {
		if (address && !applyStatus) {
			loadData();
			getPendingChain();
		}
	}, [address, applyStatus, getPendingChain, loadData]);

	async function onChain() {
		// in onchain
		if (onchainStatus === 1) return;
		const pendingPoints = Number(userInfo.totalPoints) - Number(userInfo.onchainPoints);
		const pendingCases = userInfo.totalCompletedCases - userInfo.onchainCases;
		const pendingInfo = await getPendingChain();
		if (pendingPoints <= 0 && pendingCases <= 0 && !pendingInfo.oracleSignature) return;
		await getNonce();
		let oracleSignature = '';
		let points = [];
		// pending is null，go onchain，is not null，go pending onchain
		if (!pendingInfo.oracleSignature) {
			const chainData = await onChainUpdate();
			oracleSignature = chainData.oracleSignature;
			points = [
				{
					tasks: chainData.cases,
					nonce: nonce,
					points: BigInt(Number(chainData.points) * 10) * BigInt(100000000000000000),
				},
			];
		} else {
			oracleSignature = pendingInfo.oracleSignature;
			points = pendingInfo.points;
		}
		console.log(points, oracleSignature);

		const contractConfig: any = {
			functionName: 'addPoints',
			address: contractAddress,
			abi: contractABI,
			args: [address, ...points, oracleSignature],
		};
		await writeContractAsync(contractConfig);
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
		<div className="flex flex-col h-[1.18rem] w-full bg-[#fff] rounded-[0.16rem] mb-[0.16rem] px-[0.22rem] py-[0.16rem]">
			<span className="text-[0.16rem] font-bold text-[#000] mb-[0.06rem] leading-[0.16rem]">Dashboard</span>

			<div className="flex justify-around items-start">
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.16rem] text-[#000] leading-[0.24rem] h-[0.24rem]">
						{address && userInfo ? userInfo.totalCompletedCases : '-'}
					</span>
					<span className="text-[0.14rem] text-[#999] leading-[0.14rem]">Total Cases</span>
				</div>
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.16rem] text-[#000] leading-[0.24rem] h-[0.24rem]">
						<span>
							Cases:&nbsp;&nbsp;
							{address && userInfo ? userInfo.totalCompletedCases - userInfo.onchainCases : '-'}
						</span>
						<span className="ml-[0.4rem]">
							Points:&nbsp;&nbsp;
							{address && userInfo
								? (Number(userInfo.totalPoints) - Number(userInfo.onchainPoints)).toFixed(1)
								: '-'}
						</span>
					</span>
					<span className="text-[0.14rem] text-[#999] leading-[0.16rem]">Pending Submits</span>
					<span
						className="text-[0.14rem] leading-[0.24rem] bg-[#EFF7FF] mt-[0.06rem] h-[0.24rem] px-[0.1rem] text-[#3A54DF] rounded-[0.16rem] cursor-pointer"
						onClick={onChain}
					>
						{(onchainStatus === 0 || onchainStatus === 2) && 'Submit onChain'}
						{onchainStatus === 3 && 'Retry'}
						{onchainStatus === 1 && 'Pending'} &gt;
					</span>
				</div>
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.16rem] text-[#000] leading-[0.24rem] h-[0.24rem]">
						{address && userInfo ? userInfo.onchainCases : '-'}
					</span>
					<span className="text-[0.14rem] text-[#999] leading-[0.16rem]">Total Cases onChain</span>
				</div>
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.16rem] text-[#000] leading-[0.24rem] h-[0.24rem]">
						{address && userInfo ? Number(userInfo.onchainPoints).toFixed(1) : '-'}
					</span>
					<span className="text-[0.14rem] text-[#999] leading-[0.16rem]">onChain Points</span>
				</div>
			</div>
		</div>
	);
}
export default Dashboard;

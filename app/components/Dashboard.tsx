/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-16 08:09:50
 * @FilePath: /dedata-front/app/components/Dashboard.tsx
 * @Description:
 */
'use client';

import { message } from 'antd';
import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';
import { getSummaryInfo, updatePoints } from '@/app/lib/api';
import useNonce from '@/app/hooks/useNonce';
import { SUCCESS_CODE } from '@/app/utils/constant';

function Dashboard({ applyStatus }: any) {
	const [userInfo, setUserInfo] = useState({
		totalCompletedCases: 0,
		onchainCases: 0,
		totalPoints: '0',
	});
	const { address, isConnected } = useAccount();
	const nonce = useNonce(address);

	const { signMessageAsync } = useSignMessage();

	useEffect(() => {
		async function loadData() {
			const result = await getSummaryInfo(address);
			console.log(result);
			setUserInfo(result.data);
		}
		if (address && !applyStatus) {
			loadData();
		}
	}, [address, applyStatus]);

	async function onChain() {
		if (userInfo.totalCompletedCases - userInfo.onchainCases <= 0) return;
		const signatureStr = `nonce: ${nonce}`;
		const signature = await signMessageAsync({
			message: signatureStr,
		});

		const body = {
			nonce: `${nonce}`,
			address,
			signature,
		};

		console.log(body);

		const { code, msg } = await updatePoints(body);
		if (code === SUCCESS_CODE) {
			message.info('数据更新成功');
		} else {
			message.error(msg);
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
						{address && userInfo ? userInfo.totalCompletedCases - userInfo.onchainCases : '-'}
					</span>
					<span className="text-[0.16rem] text-[#999] leading-[0.21rem]">Pending Submits</span>
					<span
						className="text-[0.14rem] leading-[0.24rem] bg-[#EFF7FF] mt-[0.1rem] h-[0.24rem] px-[0.1rem] text-[#3A54DF] rounded-[0.16rem] cursor-pointer"
						onClick={onChain}
					>
						Submit batch onChain &gt;
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

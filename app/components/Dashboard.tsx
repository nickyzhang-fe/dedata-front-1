/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-10 08:28:27
 * @FilePath: /dedata-front/app/components/Dashboard.tsx
 * @Description:
 */
'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { getSummaryInfo } from '@/app/lib/api';

function Dashboard() {
	const [userInfo, setUserInfo] = useState({});
	const { address, isConnected } = useAccount();

	useEffect(() => {
		async function loadData() {
			const result = await getSummaryInfo(address);
			console.log(result);
			setUserInfo(result.data);
		}
		if (address) {
			loadData();
		}
	}, [address]);

	return (
		<div className="flex flex-col h-[1.5rem] w-full bg-[#fff] rounded-[0.16rem] mb-[0.24rem] px-[0.24rem] py-[0.18rem]">
			<span className="text-[0.16rem] font-bold text-[#000] mb-[0.1rem] leading-[0.21rem]">Dashboard</span>
			<div className="flex justify-around items-start">
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.24rem] text-[#000] leading-[0.32rem]">{userInfo.totalCases}</span>
					<span className="text-[0.16rem] text-[#999] leading-[0.21rem]">Total Cases</span>
				</div>
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.24rem] text-[#000] leading-[0.32rem]">10</span>
					<span className="text-[0.16rem] text-[#999] leading-[0.21rem]">Pending Submits</span>
					<span className="text-[0.14rem] leading-[0.24rem] bg-[#EFF7FF] mt-[0.1rem] h-[0.24rem] px-[0.1rem] text-[#3A54DF] rounded-[0.16rem] cursor-pointer">
						Submit batch onChain &gt;
					</span>
				</div>
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.24rem] text-[#000] leading-[0.32rem]">{userInfo.onchainCases}</span>
					<span className="text-[0.16rem] text-[#999] leading-[0.21rem]">Total Submits onChain</span>
				</div>
				<div className="flex flex-col justify-center items-center">
					<span className="text-[0.24rem] text-[#000] leading-[0.32rem]">{userInfo.totalPoints}</span>
					<span className="text-[0.16rem] text-[#999] leading-[0.21rem]">Points</span>
				</div>
			</div>
		</div>
	);
}
export default Dashboard;

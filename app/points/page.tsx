/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-14 23:05:47
 * @FilePath: /dedata-front/app/points/page.tsx
 * @Description:
 */
'use client';

import { useState } from 'react';
import { PROMOTION_CHANNELS } from '@/app/utils/constant';
import Dashboard from '@/app/components/Dashboard';
import Calendar from '../components/Calendar';
import Image from 'next/image';
import { message } from 'antd';
export default function PointsCenter() {
	const [applyStatus, setApplyStatus] = useState(false);
	/**
	 * role ro language status change
	 */
	function jumpChannel(item: { image: string; title: string; icon: string; points: string }) {
		message.info('Coming soon');
	}

	const promotionChannels = PROMOTION_CHANNELS.map((item, index) => {
		return (
			<div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => jumpChannel(item)}>
				<Image
					src={item?.image}
					alt="channels"
					width={0}
					height={0}
					className="w-[1.1rem] h-[1.1rem]"
					priority
				/>
				<div className="flex mt-[0.12rem] mb-[0.08rem]">
					<Image
						src={item?.icon}
						alt="icon"
						width={0}
						height={0}
						className="w-[0.2rem] h-[0.2rem]"
						priority
					/>
					<span className="text-[0.14rem] font-bold text-[#333] ml-[0.06rem]">{item.title}</span>
				</div>
				<div className="text-[#fff] text-[0.12rem] px-[0.08rem] py-[0.02rem] rounded-[0.2rem] bg-[#3A54DF]">
					+{item.points} Points
				</div>
			</div>
		);
	});

	return (
		<div className="flex flex-col flex-1 w-full overflow-hidden relative">
			<Dashboard applyStatus={applyStatus} />
			<div className="flex flex-col flex-1 w-full items-start bg-[#fff] rounded-[0.16rem] px-[0.24rem] py-[0.16rem] overflow-auto relative">
				<div className="text-[0.16rem] font-bold text-[#000]">Points Center</div>
				<div className="flex gap-[0.6rem] p-[0.3rem]">
					{promotionChannels}
					<div className="w-[1.1rem] h-[1.1rem] rounded-[1.1rem] bg-[#3A54DF] opacity-50 text-[#fff] text-[0.14rem] text-center leading-[1.1rem]">
						More...
					</div>
				</div>
				<div className="text-[0.16rem] font-bold text-[#000]">Daily Checkin</div>
				<Calendar />
			</div>
		</div>
	);
}

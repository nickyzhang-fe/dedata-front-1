/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-28 23:02:32
 * @FilePath: /dedata-front/app/components/Empty.tsx
 * @Description:
 */
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { message } from 'antd';

function Empty(props: any) {
	const [visible, setVisible] = useState(false);
	const { isConnected } = useAccount();
	function onChange() {
		if (!isConnected) {
			message.info('Please connect wallet first');
			return;
		}
		setVisible(true);
		props.onApplyChange(true);
	}

	useEffect(() => {
		setVisible(props.applyStatus);
	}, [props.applyStatus]);

	if (visible) {
		return null;
	}
	return (
		<div className="flex flex-1 flex-col justify-center items-center">
			<div className="w-[0.64rem] h-[0.64rem] opacity-30">
				<Image
					src={props.image ? props.image : '/empty.png'}
					alt="logo"
					width={0}
					height={0}
					className="w-full h-auto"
					priority
				/>
			</div>
			<span className="text-[0.16rem] leading-[0.21rem] mb-[0.26rem] mt-[0.3rem]">
				{props.emptyText ? props.emptyText : 'Summarize news abstract to earn'}
			</span>
			<div
				className="bg-[#3A54DF] h-[0.6rem] w-[2rem] text-[0.16rem] rounded-[0.16rem] text-[#fff] text-center leading-[0.6rem] cursor-pointer font-bold"
				onClick={onChange}
			>
				+ Apply Case
			</div>
		</div>
	);
}

export default Empty;

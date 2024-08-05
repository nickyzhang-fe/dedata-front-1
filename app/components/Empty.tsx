/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-08 06:44:54
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
		console.log('Click');
		if (!isConnected) {
			message.info('请先登陆钱包');
			return;
		}
		setVisible(true);
		props.onApplyChange(true);
		props.onRoleAndLanguageChange({
			languageStatus: props.languageStatus,
			roleStatus: props.roleStatus,
		});
	}

	useEffect(() => {
		setVisible(props.applyStatus);
	}, [props.applyStatus]);

	if (visible) {
		return null;
	}
	return (
		<div className="flex flex-1 flex-col justify-center items-center">
			<div className="w-[1.6rem] h-[1.6rem]">
				<Image src="/empty.png" alt="logo" width={0} height={0} className="w-full h-auto" priority />
			</div>
			<span className="text-[0.16rem] leading-[0.21rem] mb-[0.26rem] -mt-[0.2rem]">Click to apply new cases</span>
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

/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-27 23:50:52
 * @FilePath: /dedata-front/app/page.tsx
 * @Description:
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import ContentHeader from '@/app/components/ContentHeader';
import Empty from '@/app/components/Empty';
import Maker from '@/app/components/Maker';
import Checker from '@/app/components/Checker';
import { useAccount } from 'wagmi';
import { getPendingCase } from '@/app/lib/api';
import { SUCCESS_CODE } from '@/app/utils/constant';
import Dashboard from '@/app/components/Dashboard';
import ConnectWallet from '@/app/components/ConnectWallet';

export default function Home() {
	const { address, isConnected } = useAccount();

	const [languageStatus, setLanguageStatus] = useState('en');
	const [roleStatus, setRoleStatus] = useState(1);

	const [minutes, setMinutes] = useState(10);
	const [seconds, setSeconds] = useState(0);
	// 申请状态，true代表有case，false代表case完成或者未开始
	const [applyStatus, setApplyStatus] = useState(false);

	useEffect(() => {
		async function loadData() {
			const { code, data, msg } = await getPendingCase(address);
			if (code === SUCCESS_CODE) {
				if (!data.isExist) {
					setApplyStatus(false);
				} else {
					// taskType 区分1：maker or 2：checker
					setLanguageStatus(data.pendingCase.language);
					setRoleStatus(data.pendingCase.taskType);
					setApplyStatus(true);
				}
			}
		}
		if (address) {
			loadData();
		}
	}, [address]);
	/**
	 * 角色和语言状态改变
	 */
	const onRoleAndLanguageChange = useCallback((params: any) => {
		const { languageStatus, roleStatus } = params;
		setLanguageStatus(languageStatus);
		setRoleStatus(roleStatus);
	}, []);
	/**
	 * 当前是否有任务状态改变
	 */
	function onApplyChange(status: boolean) {
		console.log('onApplyChange', status);
		setApplyStatus(status);
		setMinutes(10);
		setSeconds(0);
	}
	/**
	 * 获取过期时间
	 */
	const onExpiredTimeChange = useCallback((time: any) => {
		const { minutes, seconds } = time;
		setMinutes(minutes);
		setSeconds(seconds);
	}, []);
	/**
	 * 保存
	 */
	const onSaveChange = useCallback(() => {
		console.log('onSaveChange');
		setApplyStatus(false);
	}, []);

	if (!address) {
		return <ConnectWallet />;
	}
	return (
		<div className="flex flex-col flex-1 w-full overflow-hidden relative">
			<Dashboard applyStatus={applyStatus} />

			<div className="flex flex-col flex-1 w-full bg-[#fff] rounded-[0.16rem] px-[0.24rem] py-[0.16rem] overflow-hidden relative">
				<ContentHeader
					title={'Work Zone'}
					disabled={applyStatus}
					roleStatus={roleStatus}
					languageStatus={languageStatus}
					onApplyChange={onApplyChange}
					onRoleAndLanguageChange={onRoleAndLanguageChange}
					minutes={minutes}
					seconds={seconds}
				/>
				<Empty
					applyStatus={applyStatus}
					onApplyChange={onApplyChange}
					roleStatus={roleStatus}
					languageStatus={languageStatus}
					onRoleAndLanguageChange={onRoleAndLanguageChange}
				/>
				<Maker
					roleStatus={roleStatus}
					applyStatus={applyStatus}
					languageStatus={languageStatus}
					onSaveChange={onSaveChange}
					onExpiredTimeChange={onExpiredTimeChange}
				/>
				<Checker
					roleStatus={roleStatus}
					applyStatus={applyStatus}
					languageStatus={languageStatus}
					onSaveChange={onSaveChange}
					onExpiredTimeChange={onExpiredTimeChange}
				/>
			</div>
		</div>
	);
}

/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-07-04 22:36:38
 * @FilePath: /dedata-front/app/beta/page.tsx
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

export default function Beta() {
	const { address, isConnected } = useAccount();

	const [languageStatus, setLanguageStatus] = useState('en');
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
		const { languageStatus } = params;
		setLanguageStatus(languageStatus);
	}, []);
	/**
	 * 当前是否有任务状态改变
	 */
	function onApplyChange(status: boolean) {
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
					roleStatus={2}
					showRoles={false}
					languageStatus={languageStatus}
					onApplyChange={onApplyChange}
					onRoleAndLanguageChange={onRoleAndLanguageChange}
					minutes={minutes}
					seconds={seconds}
				/>
				<Empty
					applyStatus={applyStatus}
					onApplyChange={onApplyChange}
					roleStatus={2}
					languageStatus={languageStatus}
					onRoleAndLanguageChange={onRoleAndLanguageChange}
				/>
				<Checker
					roleStatus={2}
					applyStatus={applyStatus}
					languageStatus={languageStatus}
					onSaveChange={onSaveChange}
					onExpiredTimeChange={onExpiredTimeChange}
				/>
			</div>
		</div>
	);
}

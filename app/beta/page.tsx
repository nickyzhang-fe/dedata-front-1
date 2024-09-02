/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-28 22:57:36
 * @FilePath: /dedata-front/app/beta/page.tsx
 * @Description:
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import ContentHeader from '@/app/components/ContentHeader';
import Empty from '@/app/components/Empty';
import Checker from '@/app/components/Checker';
import { useAccount } from 'wagmi';
import { getPendingCase } from '@/app/lib/api';
import { SUCCESS_CODE } from '@/app/utils/constant';
import Dashboard from '@/app/components/Dashboard';

export default function Beta() {
	const { address } = useAccount();

	const [languageStatus, setLanguageStatus] = useState('en');
	const [minutes, setMinutes] = useState(10);
	const [seconds, setSeconds] = useState(0);
	// apply status true: has case，false: no case or not started
	const [applyStatus, setApplyStatus] = useState(false);

	useEffect(() => {
		async function loadData() {
			const { code, data, msg } = await getPendingCase(address, 2);
			if (code === SUCCESS_CODE) {
				if (!data.isExist) {
					setApplyStatus(false);
				} else {
					// taskType 1：maker or 2：checker
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
	 * role and language status change
	 */
	const onRoleAndLanguageChange = useCallback((params: any) => {
		const { languageStatus } = params;
		setLanguageStatus(languageStatus);
	}, []);
	/**
	 * task status change
	 */
	function onApplyChange(status: boolean) {
		setApplyStatus(status);
		setMinutes(10);
		setSeconds(0);
	}
	/**
	 * get expired time
	 */
	const onExpiredTimeChange = useCallback((time: any) => {
		const { minutes, seconds } = time;
		setMinutes(minutes);
		setSeconds(seconds);
	}, []);
	/**
	 * save submit
	 */
	const onSaveChange = useCallback(() => {
		setApplyStatus(false);
	}, []);

	return (
		<div className="flex flex-col flex-1 w-full overflow-hidden relative">
			<Dashboard applyStatus={applyStatus} />

			<div className="flex flex-col flex-1 w-full bg-[#fff] rounded-[0.16rem] px-[0.24rem] py-[0.16rem] overflow-hidden relative">
				<ContentHeader
					title={'Work Zone'}
					href={'https://docs.dedata.io/product-guides/datatalk/dearticle-beta'}
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
					image={'/DeArticle.png'}
					applyStatus={applyStatus}
					onApplyChange={onApplyChange}
					roleStatus={2}
					languageStatus={languageStatus}
					onRoleAndLanguageChange={onRoleAndLanguageChange}
				/>
				<Checker
					type="2"
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

/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-25 22:20:14
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

export default function Home() {
	const { address, isConnected } = useAccount();

	const [languageStatus, setLanguageStatus] = useState('en');
	const [roleStatus, setRoleStatus] = useState(1);

	const [minutes, setMinutes] = useState(10);
	const [seconds, setSeconds] = useState(0);
	// apply status，true: has case，false: no case or not start
	const [applyStatus, setApplyStatus] = useState(false);

	useEffect(() => {
		async function loadData() {
			const { code, data, msg } = await getPendingCase(address);
			if (code === SUCCESS_CODE) {
				if (!data.isExist) {
					setApplyStatus(false);
				} else {
					// taskType 1：maker or 2：checker
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
	 * role ro language status change
	 */
	const onRoleAndLanguageChange = useCallback((params: any) => {
		const { languageStatus, roleStatus } = params;
		setLanguageStatus(languageStatus);
		setRoleStatus(roleStatus);
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
	 * save
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
					href={'https://docs.dedata.io/product-guides/datatalk/dearticle-alpha'}
					disabled={applyStatus}
					roleStatus={roleStatus}
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
					roleStatus={roleStatus}
					languageStatus={languageStatus}
					onRoleAndLanguageChange={onRoleAndLanguageChange}
				/>
				<Maker
					type="1"
					roleStatus={roleStatus}
					applyStatus={applyStatus}
					languageStatus={languageStatus}
					onSaveChange={onSaveChange}
					onExpiredTimeChange={onExpiredTimeChange}
				/>
				<Checker
					type="1"
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

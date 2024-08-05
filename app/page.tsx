/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-06-02 23:24:21
 * @FilePath: /dedata-front/app/page.tsx
 * @Description:
 */
'use client';

import { useState } from 'react';
import ContentHeader from '@/app/components/ContentHeader';
import Empty from '@/app/components/Empty';
import Maker from '@/app/components/Maker';
import Checker from '@/app/components/Checker';

export default function Home() {
	const [languageStatus, setLanguageStatus] = useState(1);
	const [roleStatus, setRoleStatus] = useState(1);
	const [applyStatus, setApplyStatus] = useState(false);
	function onRoleAndLanguageChange(params: any) {
		console.log('roles and language status', params);
		const { languageStatus, roleStatus } = params;
		setLanguageStatus(languageStatus);
		setRoleStatus(roleStatus);
		getData();
	}
	function onApplyChange(status: boolean) {
		console.log('接收status', status);
		setApplyStatus(status);
	}

	function onSaveChange() {
        setApplyStatus(false)
    }

	function getData() {
		console.log('----->languageStatus', languageStatus);
		console.log('----->roleStatus', roleStatus);
	}

	return (
		<div className="flex flex-col flex-1 w-full bg-[#fff] rounded-[0.16rem] px-[0.24rem] py-[0.16rem] overflow-hidden relative">
			<ContentHeader
				title={'Work Zone'}
				disabled={applyStatus}
				onApplyChange={onApplyChange}
				onRoleAndLanguageChange={onRoleAndLanguageChange}
			/>
			<Empty
				applyStatus={applyStatus}
				onApplyChange={onApplyChange}
				roleStatus={roleStatus}
				languageStatus={languageStatus}
			/>
			<Maker
				roleStatus={roleStatus}
				applyStatus={applyStatus}
				languageStatus={languageStatus}
				onSaveChange={onSaveChange}
			/>
			<Checker
				roleStatus={roleStatus}
				applyStatus={applyStatus}
				languageStatus={languageStatus}
				onSaveChange={onSaveChange}
			/>
		</div>
	);
}

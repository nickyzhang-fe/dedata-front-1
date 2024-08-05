/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-09 07:19:37
 * @FilePath: /dedata-front/app/page.tsx
 * @Description:
 */
'use client';

import { useState } from 'react';
import ContentHeader from '@/app/components/ContentHeader';
import Empty from '@/app/components/Empty';
import Maker from '@/app/components/Maker';
import Checker from '@/app/components/Checker';
import { useAccount } from 'wagmi';

export default function Home() {
	const { address, isConnected } = useAccount();

	const [languageStatus, setLanguageStatus] = useState(1);
	const [roleStatus, setRoleStatus] = useState(1);
	// 申请状态，true代表有case，false代表case完成或者未开始
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
		setApplyStatus(false);
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
				onRoleAndLanguageChange={onRoleAndLanguageChange}
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

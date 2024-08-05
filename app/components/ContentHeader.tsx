/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-16 08:34:47
 * @FilePath: /dedata-front/app/components/ContentHeader.tsx
 * @Description:
 */
'use client';

import { Select, message } from 'antd';
import { ROLES, LANGUAGES } from '@/app/utils/constant';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

function ContentHeader(props: any) {
	const [languageStatus, setLanguageStatus] = useState('en');
	const [roleStatus, setRoleStatus] = useState(1);
	const [disabled, setDisabled] = useState();
	const { isConnected } = useAccount();

	useEffect(() => {
		setDisabled(props.disabled);
		setLanguageStatus(props.languageStatus);
		setRoleStatus(props.roleStatus);
	}, [props.disabled, props.roleStatus, props.languageStatus]);

	function languageChange(value: string) {
		setLanguageStatus(value);
		props.onRoleAndLanguageChange({
			languageStatus: value,
			roleStatus,
		});
	}

	function roleChange(value: number) {
		setRoleStatus(value);
		props.onRoleAndLanguageChange({
			languageStatus,
			roleStatus: value,
		});
	}

	function applyCaseChange() {
		console.log('---->applyCaseChange', disabled);
		if (!isConnected) {
			message.info('请先登陆钱包');
			return;
		}
		if (disabled) {
			message.info('请先完成当前任务');
			return;
		}
		props.onApplyChange(true);
	}

	return (
		<div className="flex justify-between items-center">
			<span className="text-[0.16rem] font-bold text-[#000]">{props.title}</span>
			<div className="flex items-center h-[0.4rem]">
				<Select
					value={languageStatus}
					style={{ width: '1.5rem', height: '0.4rem' }}
					onChange={languageChange}
					options={LANGUAGES}
					disabled={disabled}
				/>
				<span className="text-[0.14rem] text-[#333] ml-[0.1rem]">Role:</span>
				<Select
					value={roleStatus}
					style={{ width: '1.5rem', height: '0.4rem' }}
					onChange={roleChange}
					options={ROLES}
					disabled={disabled}
				/>
				<div
					className="bg-[#3A54DF] h-[0.4rem] leading-[0.4rem] text-center w-[1.28rem] text-[#fff] text-[0.16rem] cursor-pointer rounded-[0.16rem] ml-[0.1rem]"
					onClick={applyCaseChange}
				>
					+ Apply Case
				</div>
			</div>
		</div>
	);
}
export default ContentHeader;

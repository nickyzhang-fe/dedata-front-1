/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-25 22:32:08
 * @FilePath: /dedata-front/app/components/ContentHeader.tsx
 * @Description:
 */
'use client';

import { Select, message } from 'antd';
import { ROLES, LANGUAGES } from '@/app/utils/constant';
import { useEffect, useState, useMemo } from 'react';
import { useAccount } from 'wagmi';
import CountDown from '@/app/components/CountDown';

function ContentHeader(props: any) {
	const [languageStatus, setLanguageStatus] = useState('en');
	const [roleStatus, setRoleStatus] = useState(1);
	const [disabled, setDisabled] = useState(false);
	const [minutes, setMinutes] = useState(10);
	const [seconds, setSeconds] = useState(0);
	const { isConnected } = useAccount();

	useEffect(() => {
		setDisabled(props.disabled);
		setLanguageStatus(props.languageStatus);
		setRoleStatus(props.roleStatus);
		setMinutes(props.minutes);
		setSeconds(props.seconds);
	}, [props.disabled, props.roleStatus, props.languageStatus, props.minutes, props.seconds]);

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
			message.info('Please connect wallet first');
			return;
		}
		if (disabled) {
			message.info('Please finish current case');
			return;
		}
		props.onApplyChange(true);
	}

	function resetTime() {
		console.log('resetTime');
		props.onApplyChange(false);
	}

	return (
		<div className="flex justify-between items-center">
			<span className="text-[0.16rem] font-bold text-[#000]">{props.title}</span>
			<div className="flex items-center h-[0.4rem]">
				{disabled && (
					<span className="text-[0.14rem] text-[#333] ml-[0.1rem]">
						Estimated point: {roleStatus === 1 ? 10 : 1}
					</span>
				)}
				{disabled && (
					<>
						<span className="text-[0.14rem] text-[#333] ml-[0.1rem]">Expire Time: </span>
						<CountDown minutes={minutes} seconds={seconds} resetTime={resetTime} />
					</>
				)}
				<Select
					value={languageStatus}
					style={{ width: '1.5rem', height: '0.32rem' }}
					onChange={languageChange}
					options={LANGUAGES}
					disabled={disabled}
				/>
				<span className="text-[0.14rem] text-[#333] ml-[0.1rem]">Role:</span>
				<Select
					value={roleStatus}
					style={{ width: '1.5rem', height: '0.32rem' }}
					onChange={roleChange}
					options={ROLES}
					disabled={disabled}
				/>
				<div
					className="bg-[#3A54DF] h-[0.32rem] leading-[0.32rem] text-center w-[1.28rem] text-[#fff] text-[0.14rem] cursor-pointer rounded-[0.16rem] ml-[0.1rem]"
					onClick={applyCaseChange}
				>
					+ Apply Case
				</div>
			</div>
		</div>
	);
}
export default ContentHeader;

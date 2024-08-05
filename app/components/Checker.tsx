/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-10 10:06:18
 * @FilePath: /dedata-front/app/components/Checker.tsx
 * @Description:
 */
'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { getCheckerInfo, createCheckerInfo } from '@/app/lib/api';
import useNonce from '@/app/hooks/useNonce';

const { TextArea } = Input;

function Checker({ roleStatus, applyStatus, onSaveChange }: any) {
	const [checkerInfo, setCheckerInfo] = useState(1);
	const [makerId, setMakerId] = useState(null);

	const { address, isConnected } = useAccount();
	const { signMessageAsync } = useSignMessage();

	const nonce = useNonce(address);

	useEffect(() => {
		async function loadData() {
			const result = await getCheckerInfo(address);
			console.log(result);
			setCheckerInfo(result.data);
		}
		if (address && roleStatus === 2 && applyStatus) {
			loadData();
		}
	}, [roleStatus, address, applyStatus]);

	/**
	 * @description: 校验保存参数
	 */
	async function validatorMaker() {
		console.log('submit', languageStatus);
		if (!makerId) {
			message.info('请先选择');
			return;
		}
		onSubmit();
	}

	async function onSubmit() {
		const signature = await signMessageAsync({
			message: `${nonce + 1n}`,
		});

		const body = {
			makerId,
			address,
			signature,
		};
		console.log(body);

		const result = await createCheckerInfo(body);
		console.log(result);
		message.info('Save successfully');
		onSaveChange();
	}

	if (roleStatus === 2 && applyStatus) {
		return (
			<div>
				<div className="flex flex-col h-[calc(100%-0.4rem)] overflow-y-auto mb-[0.84rem]">
					<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">
						Original Article
					</span>
					<div className="text-[#000] text-[0.14rem] leading-[0.22rem] bg-[#F5F7FA] px-[0.24rem] py-[0.16rem] rounded-[0.16rem]">
						According to BlockBeats, on May 1, according to official news, the tokenization platform
						Securitize completed a strategic financing of US$47 million. This round of financing was led by
						BlackRock, and Hamilton Lane, ParaFi Capital, Tradeweb Markets, Aptos Labs, Circle and Paxos
						participated in the investment.
					</div>
					<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">Abstract</span>
				</div>

				<div
					className="absolute left-[0.24rem] bottom-[0.14rem] w-[2rem] h-[0.6rem] bg-[#3A54DF] text-[#fff] rounded-[0.16rem] leading-[0.6rem] text-center font-bold text-[0.24rem] mt-[0.24rem] cursor-pointer"
					onClick={validatorMaker}
				>
					Save
				</div>
			</div>
		);
	}
	return null;
}

export default Checker;

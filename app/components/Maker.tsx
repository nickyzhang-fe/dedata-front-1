/*
 * @Date: 2024-06-02 23:24:06
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-10 10:06:58
 * @FilePath: /dedata-front/app/components/Maker.tsx
 * @Description: 同时满足 role值为1、address存在、applyStatus值为true时才会加载接口数据
 */
'use client';

import { Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { getMakerInfo, createMakerInfo } from '@/app/lib/api';
import useNonce from '@/app/hooks/useNonce';
const { TextArea } = Input;

function Maker({ roleStatus, applyStatus, languageStatus, onSaveChange }: any) {
	const [makerInfo, setMakerInfo] = useState({});
	const [abstract, setAbstract] = useState('');
	// const [signature, setSignature] = useState(null);

	const { address, isConnected } = useAccount();
	const { signMessageAsync } = useSignMessage();

	const nonce = useNonce(address);

	useEffect(() => {
		async function loadData() {
			const result = await getMakerInfo(address);
			console.log(result);
			setMakerInfo(result.data);
		}
		if (address && roleStatus === 1 && applyStatus) {
			loadData();
		}
	}, [address, roleStatus, applyStatus]);

	/**
	 * @description: 校验保存参数
	 */
	async function validatorMaker() {
		console.log('submit', abstract, languageStatus);
		if (languageStatus === 'en') {
			if (abstract.length < 30) {
				message.info('Please enter valid abstract');
				return;
			}
		} else {
			if (abstract.length < 5) {
				message.info('请输入有效的摘要');
				return;
			}
		}
		onSubmit();
	}

	async function onSubmit() {
		const signature = await signMessageAsync({
			message: `${nonce + 1n}`,
		});

		const body = {
			caseId: makerInfo?.id,
			content: abstract,
			address,
			signature,
		};
		console.log(body);

		// const result = await createMakerInfo(body);
		// console.log(result);
		message.info(languageStatus === 'en' ? 'Save successfully' : '保存成功，继续完成更多任务吧');
		onSaveChange();
	}

	if (roleStatus === 1 && applyStatus) {
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
					<TextArea
						className="text-[#000] !text-[0.14rem] !leading-[0.22rem] !bg-[#F5F7FA] !px-[0.24rem] !py-[0.14rem] rounded-[0.16rem] !shadow-none !border-none !focus:bg-[#F5F7FA] !hover:border-none !hover:bg-[#F5F7FA] !focus:border-none !focus:shadow-none"
						placeholder="Please input..."
						autoSize={{ minRows: 5, maxRows: 10 }}
						onChange={(e) => setAbstract(e.target.value)}
					/>
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

export default Maker;

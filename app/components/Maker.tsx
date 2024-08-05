/*
 * @Date: 2024-06-02 23:24:06
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-27 23:41:00
 * @FilePath: /dedata-front/app/components/Maker.tsx
 * @Description: 同时满足 role值为1、address存在、applyStatus值为true时才会加载接口数据
 */
'use client';

import { Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { getMakerInfo, createMakerInfo } from '@/app/lib/api';
import { SUCCESS_CODE } from '@/app/utils/constant';
const { TextArea } = Input;

function Maker({ roleStatus, applyStatus, languageStatus, onSaveChange, onExpiredTimeChange }: any) {
	const [makerInfo, setMakerInfo] = useState({
		id: 0,
		content: '',
	});
	const [abstract, setAbstract] = useState('');

	const { address, isConnected } = useAccount();
	const { signMessageAsync } = useSignMessage();

	useEffect(() => {
		async function loadData() {
			const { code, data, msg } = await getMakerInfo(address, languageStatus);
			// console.log(code, data, msg);
			if (code === SUCCESS_CODE) {
				const { content, expiredTime } = data;
				setMakerInfo({
					...data,
					content: content.replace('\n', '<br>') || '',
				});
				const timeDis = (expiredTime - Math.floor(Date.now())) / 1000;
				if (timeDis < 0) return;
				const minutes = Math.floor(timeDis / 60);
				const seconds = Math.floor(timeDis % 60);
				onExpiredTimeChange({
					minutes,
					seconds,
				});
			} else {
				message.error(msg);
				setTimeout(() => {
					onSaveChange();
				}, 2000);
			}
		}
		if (address && roleStatus === 1 && applyStatus) {
			console.log('loadData');
			loadData();
		}
	}, [address, roleStatus, applyStatus, languageStatus, onSaveChange, onExpiredTimeChange]);
	/**
	 * @description: 校验保存参数
	 */
	async function validatorMaker() {
		console.log('submit', abstract.length, languageStatus);
		if (languageStatus === 'en') {
			if (abstract.length < 30) {
				message.info('Please enter the news abstract, suggest less than 30 words');
				return;
			}
		} else {
			if (abstract.length < 5) {
				message.info('Please enter the news abstract, suggest less than 30 words');
				return;
			}
		}
		onSubmit();
	}

	async function onSubmit() {
		const signatureStr = `caseId: ${makerInfo?.id}\ncontent: ${abstract}`;
		const signature = await signMessageAsync({
			message: signatureStr,
		});
		const body = {
			caseId: makerInfo?.id,
			content: abstract,
			address,
			signature,
		};
		const { code, msg } = await createMakerInfo(body);
		if (code === SUCCESS_CODE) {
			message.info(languageStatus === 'en' ? 'Save successfully' : '保存成功，继续完成更多任务吧');
			setTimeout(() => {
				onSaveChange();
				setMakerInfo({
					id: 0,
					content: '',
				});
			}, 2000);
		} else {
			message.error(msg);
		}
	}

	if (roleStatus === 1 && applyStatus) {
		return (
			<div className="h-[calc(100%-0.4rem)] pt-[0.16rem]">
				<div className="flex flex-col h-full overflow-y-auto">
					<span className="text-[#000] text-[0.14rem] font-bold mb-[0.14rem]">Original Article</span>
					<div
						className="text-[#000] text-[0.14rem] leading-[0.22rem] bg-[#F5F7FA] px-[0.24rem] py-[0.16rem] rounded-[0.16rem]"
						dangerouslySetInnerHTML={{ __html: makerInfo?.content }}
					/>
					<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">
						Abstract
						<span className="text-[#999] text-[0.12rem] font-bold mt-[0.24rem] mb-[0.14rem]">
							（Summarize the news, no more than 15 words）
						</span>
					</span>
					<TextArea
						className="text-[#000] !text-[0.14rem] !leading-[0.22rem] !bg-[#F5F7FA] !px-[calc(0.24rem-11px)] !py-[calc(0.14rem-4px)] rounded-[0.16rem] !shadow-none !border-none !focus:bg-[#F5F7FA] !hover:border-none !hover:bg-[#F5F7FA] !focus:border-none !focus:shadow-none"
						placeholder="Please input..."
						showCount
						maxLength={200}
						autoSize={{ minRows: 2, maxRows: 4 }}
						onChange={(e) => setAbstract(e.target.value)}
					/>
					<div
						className="w-[2rem] h-[0.48rem] bg-[#3A54DF] text-[#fff] rounded-[0.16rem] leading-[0.48rem] text-center font-bold text-[0.18rem] mt-[0.24rem] cursor-pointer"
						onClick={validatorMaker}
					>
						Save
					</div>
				</div>
			</div>
		);
	}
	return null;
}

export default Maker;

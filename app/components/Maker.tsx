/*
 * @Date: 2024-06-02 23:24:06
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-25 22:00:10
 * @FilePath: /dedata-front/app/components/Maker.tsx
 * @Description: Satisfy at the same time role=1、address exist、applyStatus=true loading data
 */
'use client';

import { Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { getMakerInfo, createMakerInfo } from '@/app/lib/api';
import { SUCCESS_CODE } from '@/app/utils/constant';
import Image from 'next/image';
import Audio from './Audio';

const { TextArea } = Input;

function Maker({ roleStatus, applyStatus, languageStatus, onSaveChange, onExpiredTimeChange, type }: any) {
	// type 1: alpha 3: image 4: audio
	const [makerInfo, setMakerInfo] = useState({
		id: 0,
		content: '',
		type: 1,
		fileUrl: '',
	});
	const [abstract, setAbstract] = useState('');

	const { address } = useAccount();
	const { signMessageAsync } = useSignMessage();

	useEffect(() => {
		async function loadData() {
			const { code, data, msg } = await getMakerInfo(address, languageStatus, type);
			console.log('------->maker', code, data, msg);
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
			loadData();
		}
	}, [address, roleStatus, applyStatus, languageStatus, onSaveChange, onExpiredTimeChange, type]);
	/**
	 * @description: verify save parameters
	 */
	async function validatorMaker() {
		// console.log('submit', abstract.length, languageStatus);
		let msg = '';
		switch (Number(type)) {
			case 3:
				msg = 'Please enter the captions for images, suggest less than 20 words';
				break;
			case 4:
				msg = 'Please enter the contents of the audio';
				break;
			case 1:
			default:
				msg = 'Please enter the news abstract, suggest less than 20 words';
				break;
		}
		if (languageStatus === 'en') {
			if (abstract.length < 20) {
				message.info(msg);
				return;
			}
		} else {
			if (abstract.length < 5) {
				message.info(msg);
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
					type: 1,
					fileUrl: '',
				});
			}, 2000);
		} else {
			message.error(msg);
		}
	}

	const getTitleText = (articleType: number) => {
		switch (articleType) {
			case 3:
				return 'Image';
			case 4:
				return 'Audio';
			case 1:
			case 2:
			default:
				return 'Article';
		}
	};

	if (roleStatus === 1 && applyStatus) {
		return (
			<div className="h-[calc(100%-0.4rem)] pt-[0.16rem]">
				<div className="flex flex-col h-full overflow-y-auto">
					<span className="text-[#000] text-[0.14rem] font-bold mb-[0.14rem]">
						Original {getTitleText(makerInfo?.type)}
					</span>
					{makerInfo.type === 1 && (
						<div
							className="text-[#000] text-[0.14rem] leading-[0.22rem] bg-[#F5F7FA] px-[0.24rem] py-[0.16rem] rounded-[0.16rem]"
							dangerouslySetInnerHTML={{ __html: makerInfo?.content }}
						/>
					)}
					{makerInfo.type === 3 && (
						<Image
							src={makerInfo?.fileUrl}
							alt="logo"
							width={0}
							height={0}
							className="w-[2.4rem] h-[2.4rem] mx-auto my-0 object-cover"
							priority
						/>
					)}
					{makerInfo.type === 4 && <Audio url={makerInfo?.fileUrl} />}
					{makerInfo.type === 1 && (
						<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">
							Abstract
							<span className="text-[#999] text-[0.12rem] font-bold mt-[0.24rem] mb-[0.14rem]">
								（Summarize the news, no more than 15 words）
							</span>
						</span>
					)}
					{makerInfo.type === 3 && (
						<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">
							Description
							<span className="text-[#999] text-[0.12rem] font-bold mt-[0.24rem] mb-[0.14rem]">
								（Generate captions for images, no more than 20 words)
							</span>
						</span>
					)}
					{makerInfo.type === 4 && (
						<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">
							Description
							<span className="text-[#999] text-[0.12rem] font-bold mt-[0.24rem] mb-[0.14rem]">
								（The content of the audio is:)
							</span>
						</span>
					)}
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

/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-26 21:48:05
 * @FilePath: /dedata-front/app/components/Checker.tsx
 * @Description:
 */
'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { message, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { getCheckerInfo, createCheckerInfo } from '@/app/lib/api';
import { SUCCESS_CODE } from '@/app/utils/constant';
import type { RadioChangeEvent } from 'antd';
import Image from 'next/image';
import Audio from './Audio';

function Checker({ roleStatus, applyStatus, languageStatus, onSaveChange, onExpiredTimeChange, type }: any) {
	// type 1: alpha 2: beta 3: image 4: audio
	const [checkerInfo, setCheckerInfo] = useState({
		content: '',
		makeList: [],
		type: 1,
		fileUrl: '',
	});

	const [makerId, setMakerId] = useState(null);
	const { address } = useAccount();
	const { signMessageAsync } = useSignMessage();

	useEffect(() => {
		async function loadData() {
			const { code, data, msg } = await getCheckerInfo(address, languageStatus, type);
			console.log('-------checker', code, data, msg);
			if (code === SUCCESS_CODE) {
				const { content, expiredTime } = data;
				setCheckerInfo({
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
		if (address && roleStatus === 2 && applyStatus) {
			loadData();
		}
	}, [roleStatus, address, applyStatus, languageStatus, onSaveChange, onExpiredTimeChange, type]);
	/**
	 * @description: verify save parameters
	 */
	async function validatorChecker() {
		if (!makerId) {
			let msg = '';
			switch (Number(type)) {
				case 3:
					msg = 'Please choose the best the caption for image';
					break;
				case 4:
					msg = 'Please choose the best the caption for audio';
				case 1:
				case 2:
				default:
					msg = 'Please finish current case';
					break;
			}
			message.info(msg);
			return;
		}
		onSubmit();
	}

	async function onSubmit() {
		const signatureStr = `makeId: ${makerId}`;

		const signature = await signMessageAsync({
			message: signatureStr,
		});

		const body = {
			makeId: makerId,
			address,
			signature,
		};

		const { code, msg } = await createCheckerInfo(body);
		if (code === SUCCESS_CODE) {
			message.info('Save successfully');
			setTimeout(() => {
				onSaveChange();
			}, 2000);
		} else {
			message.error(msg);
		}
	}

	const onRadioGroupChange = ({ target: { value } }: RadioChangeEvent) => {
		setMakerId(value);
	};

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

	if (roleStatus === 2 && applyStatus) {
		const checkerArr = (
			<Radio.Group onChange={onRadioGroupChange}>
				{checkerInfo?.makeList.map((item: any, index) => {
					return (
						<div
							className="bg-[#F5F7FA] px-[0.2rem] py-[0.08rem] rounded-[0.16rem] mb-[0.1rem]"
							key={index}
						>
							<Radio value={item.id}>{item.content}</Radio>
						</div>
					);
				})}
			</Radio.Group>
		);
		return (
			<div className="h-[calc(100%-0.4rem)] pt-[0.16rem]">
				<div className="flex flex-col h-full overflow-y-auto">
					<span className="text-[#000] text-[0.14rem] font-bold mb-[0.14rem]">
						Original {getTitleText(checkerInfo?.type)}
					</span>
					{(checkerInfo?.type === 1 || checkerInfo?.type === 2) && (
						<div
							className="text-[#000] text-[0.14rem] leading-[0.22rem] bg-[#F5F7FA] px-[0.24rem] py-[0.16rem] rounded-[0.16rem]"
							dangerouslySetInnerHTML={{ __html: checkerInfo?.content }}
						/>
					)}
					{checkerInfo?.type === 3 && (
						<Image
							src={checkerInfo?.fileUrl}
							alt="logo"
							width={0}
							height={0}
							className="w-[2.4rem] h-[2.4rem] mx-auto my-0 object-cover"
							priority
						/>
					)}
					{checkerInfo.type === 4 && <Audio url={checkerInfo?.fileUrl} />}

					{(checkerInfo?.type === 1 || checkerInfo?.type === 2) && (
						<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">
							Abstract
							<span className="text-[#999] text-[0.12rem] font-bold mt-[0.24rem] mb-[0.14rem]">
								（Choose the best summary of the news）
							</span>
						</span>
					)}
					{checkerInfo?.type === 3 && (
						<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">
							Description
							<span className="text-[#999] text-[0.12rem] font-bold mt-[0.24rem] mb-[0.14rem]">
								（Choose the best caption for the Image）
							</span>
						</span>
					)}
					{checkerInfo?.type === 4 && (
						<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">
							Description
							<span className="text-[#999] text-[0.12rem] font-bold mt-[0.24rem] mb-[0.14rem]">
								（Choose the best caption for the Audio
							</span>
						</span>
					)}
					{checkerArr}
					<div
						className="w-[2rem] h-[0.48rem] bg-[#3A54DF] text-[#fff] rounded-[0.16rem] leading-[0.48rem] text-center font-bold text-[0.18rem] mt-[0.08rem] cursor-pointer"
						onClick={validatorChecker}
					>
						Save
					</div>
				</div>
			</div>
		);
	}
	return null;
}

export default Checker;

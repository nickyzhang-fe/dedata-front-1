/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-16 09:42:51
 * @FilePath: /dedata-front/app/components/Checker.tsx
 * @Description:
 */
'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { Input, message, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { getCheckerInfo, createCheckerInfo } from '@/app/lib/api';
import useNonce from '@/app/hooks/useNonce';
import { SUCCESS_CODE } from '@/app/utils/constant';

const { TextArea } = Input;

function Checker({ roleStatus, applyStatus, languageStatus, onSaveChange }: any) {
	const [checkerInfo, setCheckerInfo] = useState({
		content: '',
		makeList: [],
	});

	const [makerId, setMakerId] = useState(null);
	const { address, isConnected } = useAccount();
	const { signMessageAsync } = useSignMessage();

	useEffect(() => {
		async function loadData() {
			const { code, data, msg } = await getCheckerInfo(address, languageStatus);
			console.log(code, data, msg);
			if (code === SUCCESS_CODE) {
				setCheckerInfo({
					...data,
					content: data.content.replace('\n', '<br>') || '',
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
	}, [roleStatus, address, applyStatus, languageStatus, onSaveChange]);
	/**
	 * @description: 校验保存参数
	 */
	async function validatorMaker() {
		console.log('submit', languageStatus);
		if (!makerId) {
			message.info('请先选择正确答案');
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

	if (roleStatus === 2 && applyStatus) {
		const checkerArr = (
			<Radio.Group onChange={onRadioGroupChange}>
				{checkerInfo?.makeList.map((item, index) => {
					return (
						<Radio value={item.id} key={index}>
							{item.content}
						</Radio>
					);
				})}
			</Radio.Group>
		);
		return (
			<div className="h-[calc(100%-0.4rem)] pt-[0.24rem]">
				<div className="flex flex-col h-[calc(100%-0.4rem)] overflow-y-auto mb-[0.84rem]">
					<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">
						Original Article
					</span>
					<div
						className="text-[#000] text-[0.14rem] leading-[0.22rem] bg-[#F5F7FA] px-[0.24rem] py-[0.16rem] rounded-[0.16rem]"
						dangerouslySetInnerHTML={{ __html: checkerInfo?.content }}
					/>
					<span className="text-[#000] text-[0.14rem] font-bold mt-[0.24rem] mb-[0.14rem]">Abstract</span>
					{checkerArr}
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

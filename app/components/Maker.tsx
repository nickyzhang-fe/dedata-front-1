'use client';

import { Input, message } from 'antd';
import { useEffect, useState } from 'react';
const { TextArea } = Input;

function Maker(props: any) {
	const [makerStatus, setMakerStatus] = useState(1);
	const [abstract, setAbstract] = useState('');

	useEffect(() => {
		setMakerStatus(props.roleStatus);
	}, [props.roleStatus]);

	function onSubmit() {
		console.log('submit', abstract, props.languageStatus);
		if (props.languageStatus === 1) {
			if (abstract.length < 30) {
				message.info('Please enter valid abstract');
				return;
			}
			message.info('Save successfully');
            props.onSaveChange()
		} else {
			if (abstract.length < 5) {
				message.info('请输入有效的摘要');
				return;
			}
			message.info('保存成功，继续完成更多任务吧');
            props.onSaveChange()
		}
	}

	if (makerStatus === 1 && props.applyStatus) {
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
					className="absolute left-[0.24rem] bottom-[0.14rem] w-[calc(100%-0.48rem)] h-[0.6rem] bg-[#3A54DF] text-[#fff] rounded-[0.16rem] leading-[0.6rem] text-center font-bold text-[0.2rem] mt-[0.24rem] cursor-pointer"
					onClick={onSubmit}
				>
					Save
				</div>
			</div>
		);
	}
	return null;
}

export default Maker;

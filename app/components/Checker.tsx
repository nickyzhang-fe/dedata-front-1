/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-06-02 22:39:34
 * @FilePath: /dedata-front/app/components/Checker.tsx
 * @Description:
 */
'use client';

import { Input } from 'antd';
import { useEffect, useState } from 'react';
const { TextArea } = Input;

function Checker(props: any) {
	const [checkerStatus, setCheckerStatus] = useState(1);

	useEffect(() => {
		setCheckerStatus(props.roleStatus);
	}, [props.roleStatus]);

	if (checkerStatus === 2 && props.applyStatus) {
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

				<div className="flex justify-between absolute left-[0.24rem] bottom-[0.14rem] w-[calc(100%-0.48rem)] h-[0.6rem] text-center font-bold text-[0.2rem] mt-[0.24rem]">
					<div className="w-[calc(50%-0.1rem)] h-[0.6rem] bg-[#F5F5F5] text-[#000000] rounded-[0.16rem] leading-[0.6rem] text-center font-bold text-[0.2rem] cursor-pointer">
						Disagree
					</div>
					<div className="w-[calc(50%-0.1rem)] h-[0.6rem] bg-[#3A54DF] text-[#fff] rounded-[0.16rem] leading-[0.6rem] text-center font-bold text-[0.2rem] cursor-pointer">
						Agree
					</div>
				</div>
			</div>
		);
	}
	return null;
}

export default Checker;

/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-03 23:36:30
 * @FilePath: /dedata-front/app/others/page.tsx
 * @Description:
 */
'use client';

import Image from 'next/image';
import style from '@/app/style/others.module.css';
import { message } from 'antd';

const ImageList = [
	{
		title: 'Face Detection',
		subtitle: 'Segment an image into different parts',
		icon: '/Face_Detection.jpg',
	},
	{
		title: 'Sentiment Classification',
		subtitle: 'Select the proper sentiment',
		icon: '/Sentiment_Classification.jpg',
	},
	{
		title: 'Chat Summary',
		subtitle: 'Summize chat history',
		icon: '/Chat_Summary.jpg',
	},
	{
		title: 'Auto Drive label',
		subtitle: 'Road environment labeling',
		icon: '/auto_drive.jpg',
	},
];

export default function Others() {
	const onClick = () => {
		message.info('Coming soon');
	};

	const othersList = ImageList.map((v, index) => {
		return (
			<div key={index}>
				<div
					className={`flex w-[2.4rem] h-[2rem] rounded-[0.16rem] overflow-hidden flex-col my-0 mx-auto ${style.othersItems} cursor-pointer`}
					onClick={onClick}
				>
					<div className="w-[2.4rem] h-[1.5rem]">
						<Image
							src={v.icon}
							alt="DeArticle"
							width={0}
							height={0}
							className="w-full h-full object-cover"
							priority
						/>
					</div>
					<div className="text-[0.14rem] px-[0.1rem] py-[0.07rem] leading-[0.14rem]">{v.title}</div>
					<div className="text-[0.10rem] leading-[0.10rem] px-[0.1rem] text-[#999]">{v.subtitle}</div>
				</div>
			</div>
		);
	});

	return (
		<div className="flex flex-col flex-1 w-full overflow-hidden relative bg-[#fff] rounded-[0.16rem] px-[0.24rem] py-[0.16rem] justify-center items-center">
			<div className="text-[0.18rem] mb-[0.5rem] leading-[0.18rem]">Coming Soon...</div>
			<div className="flex flex-wrap gap-[0.5rem] justify-center w-[6.6rem]">{othersList}</div>
		</div>
	);
}

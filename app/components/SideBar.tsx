/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-15 22:48:49
 * @FilePath: /dedata-front/app/components/SideBar.tsx
 * @Description:
 */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import dearticle from '@/app/assets/image/icon-dearticle.png';
import { ROUTERS } from '@/app/utils/constant';
import { useState } from 'react';
import style from '@/app/style/sidebar.module.css';
function SideBar() {
	const [index, setIndex] = useState(0);

	function handleClick(tabIndex: number) {
		if (tabIndex === index) return;
		setIndex(tabIndex);
	}

	const routersList = ROUTERS.map((router, tabIndex) => (
		<div
			key={router.id}
			className={`w-[2rem] h-[0.6rem] rounded-[0.16rem] flex flex-row items-center pl-[0.16rem] text-[0.14rem] text-[#000] mb-[0.1rem] relative z-1 ${
				tabIndex === index ? 'font-bold' : null
			}`}
			onClick={() => {
				handleClick(tabIndex);
			}}
		>
			<div className="w-[0.16rem] h-[0.16rem]">
				<Image
					src="/icon-dearticle.png"
					alt="DeArticle"
					width={0}
					height={0}
					className="w-full h-full"
					priority
				/>
			</div>
			<Link className="ml-[0.08rem]" href={router.route}>
				{router.title}
			</Link>
		</div>
	));
	return (
		<div className="w-[2rem] h-full overflow-x-hidden overflow-y-auto text-[0.14rem]">
			<div className="text-[0.16rem] leading-[0.21rem] mt-[0.26rem] mb-[0.32rem]">Dedata</div>
			<div className="relative">
				<div
					className={`w-[2rem] h-[0.6rem] rounded-[0.16rem] bg-[#fff] absolute z-0 ${style.tabActive}`}
					style={{
						transform: `translateY(calc(${index * 0.7}rem))`,
					}}
				/>
				{routersList}
			</div>
		</div>
	);
}
export default SideBar;

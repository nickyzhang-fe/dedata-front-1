/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-03 21:30:19
 * @FilePath: /dedata-front/app/components/SideBar.tsx
 * @Description:
 */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { ROUTERS } from '@/app/utils/constant';
import { useState, useEffect } from 'react';
import style from '@/app/style/sidebar.module.css';
function SideBar() {
	const [index, setIndex] = useState(0);
	const pathname = usePathname();

	useEffect(() => {
		if (pathname.indexOf('/beta') > -1) {
			setIndex(1);
		} else if (pathname.indexOf('/others') > -1) {
			setIndex(2);
		} else {
			setIndex(0);
		}
	}, [pathname]);

	function handleClick(tabIndex: number) {
		setIndex(tabIndex);
	}

	const routersList = ROUTERS.map((router, tabIndex) => (
		<div
			key={router.id}
			className={`w-full h-[0.48rem] rounded-[0.16rem] flex flex-row items-center pl-[0.16rem] text-[0.14rem] text-[#000] mb-[0.1rem] relative z-1 ${
				tabIndex === index ? 'font-bold' : null
			}`}
			onClick={() => {
				handleClick(tabIndex);
			}}
		>
			<div className="w-[0.16rem] h-[0.16rem]">
				{tabIndex === 2 && (
					<Image src="/other.jpg" alt="DeArticle" width={0} height={0} className="w-full h-full" priority />
				)}
				{tabIndex !== 2 && (
					<Image
						src="/icon-dearticle.png"
						alt="DeArticle"
						width={0}
						height={0}
						className="w-full h-full"
						priority
					/>
				)}
			</div>
			<Link className="ml-[0.08rem]" href={router.route}>
				{router.title}
			</Link>
		</div>
	));
	return (
		<div className="w-[1.7rem] h-full overflow-x-hidden overflow-y-auto text-[0.14rem]">
			<div className="text-[0.16rem] leading-[0.21rem] mt-[0.26rem] mb-[0.32rem]">DataTalk</div>
			<div className="relative">
				<div
					className={`w-full h-[0.48rem] rounded-[0.16rem] bg-[#fff] absolute z-0 ${style.tabActive}`}
					style={{
						transform: `translateY(calc(${index * 0.58}rem))`,
					}}
				/>
				{routersList}
			</div>
		</div>
	);
}
export default SideBar;

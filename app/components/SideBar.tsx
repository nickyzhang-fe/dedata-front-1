/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-15 22:42:02
 * @FilePath: /dedata-front/app/components/SideBar.tsx
 * @Description:
 */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MENUS } from '@/app/utils/constant';
import { useState, useEffect } from 'react';
import style from '@/app/style/sidebar.module.css';
import { message } from 'antd';
import { useAccount } from 'wagmi';
function SideBar() {
	const [index, setIndex] = useState(0);
	const [path, setPath] = useState('/');
	const pathname = usePathname();
	const { address } = useAccount();

	useEffect(() => {
		setPath(pathname);
	}, [pathname]);

	function onComing() {
		if (!address) return;
		message.info('coming soon');
	}
	const menus = [];

	for (const [key, value] of Object.entries(MENUS)) {
		menus.push(
			<div key={key}>
				<div className="text-[0.16rem] leading-[0.20rem] my-[0.20rem]">{key}</div>
				{value.map((router) => (
					<div
						key={router.id}
						className={`w-full h-[0.36rem] rounded-[0.16rem] flex flex-row items-center pl-[0.16rem] text-[0.14rem] text-[#000] mb-[0.1rem] relative z-1 ${
							path === router.route ? 'font-bold bg-[#fff]' : null
						}`}
					>
						<div className="w-[0.16rem] h-[0.16rem]">
							<Image
								src={router.icon}
								alt="DeArticle"
								width={0}
								height={0}
								className="w-full h-full"
								priority
							/>
						</div>
						{router.id === 'DataBazaar' ? (
							<div className="ml-[0.08rem] cursor-pointer" onClick={onComing}>
								{router.title}
							</div>
						) : (
							<Link className="ml-[0.08rem]" href={router.route}>
								{router.title}
							</Link>
						)}
					</div>
				))}
			</div>
		);
	}

	return <div className="w-[1.7rem] h-full overflow-x-hidden overflow-y-auto text-[0.14rem]">{menus}</div>;
}
export default SideBar;

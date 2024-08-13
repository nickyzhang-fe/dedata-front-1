/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-12 23:52:17
 * @FilePath: /dedata-front/app/components/SideBar.tsx
 * @Description:
 */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ROUTERS, MENUS } from '@/app/utils/constant';
import { useState, useEffect } from 'react';
import style from '@/app/style/sidebar.module.css';
function SideBar() {
	const [index, setIndex] = useState(0);
	const [path, setPath] = useState('/');
	const pathname = usePathname();

	useEffect(() => {
		setPath(pathname);
	}, [pathname]);

	function handleClick(tabIndex: number) {
		setIndex(tabIndex);
	}

	const menus = [];

	for (const [key, value] of Object.entries(MENUS)) {
		menus.push(
			<div key={key}>
				<div className="text-[0.16rem] leading-[0.21rem] mt-[0.26rem] mb-[0.32rem]">{key}</div>
				{value.map((router, tabIndex) => (
					<div
						key={router.id}
						className={`w-full h-[0.48rem] rounded-[0.16rem] flex flex-row items-center pl-[0.16rem] text-[0.14rem] text-[#000] mb-[0.1rem] relative z-1 ${
							path === router.route ? 'font-bold bg-[#fff]' : null
						}`}
						onClick={() => {
							handleClick(tabIndex);
						}}
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
						<Link className="ml-[0.08rem]" href={router.route}>
							{router.title}
						</Link>
					</div>
				))}
			</div>
		);
	}

	return <div className="w-[1.7rem] h-full overflow-x-hidden overflow-y-auto text-[0.14rem]">{menus}</div>;
}
export default SideBar;

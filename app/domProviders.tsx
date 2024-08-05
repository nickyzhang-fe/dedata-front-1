/*
 * @Date: 2024-06-04 22:20:34
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-03 23:04:32
 * @FilePath: /dedata-front/app/domProviders.tsx
 * @Description:
 */
'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import NavBar from '@/app/components/NavBar';
import SideBar from '@/app/components/SideBar';
import ConnectWallet from '@/app/components/ConnectWallet';
import SwitchWallet from '@/app/components/SwitchWallet';

export function DomProviders({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { address, isConnected, chain } = useAccount();
	const [isTestNet, setIsTestNet] = useState(true);

	useEffect(() => {
		console.log('chain', chain);
		if (chain?.id === 97) {
			setIsTestNet(true);
		} else {
			setIsTestNet(false);
		}
	}, [chain]);

	return (
		<div>
			<NavBar />
			<div className="flex h-[calc(100vh-0.8rem)] w-full p-[0.16rem]">
				<SideBar />
				{!address && <ConnectWallet />}
				{!isTestNet && address && <SwitchWallet />}
				{address && isTestNet && <div className="flex-1 flex ml-[0.24rem]">{children}</div>}
			</div>
		</div>
	);
}

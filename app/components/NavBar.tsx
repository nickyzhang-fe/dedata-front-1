/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-07-15 22:27:05
 * @FilePath: /dedata-front/app/components/NavBar.tsx
 * @Description:
 */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSwitchChain, useAccount } from 'wagmi';

function NavBar() {
	const { chains, switchChain } = useSwitchChain();
	const { chain, address } = useAccount();
	const [isTestNet, setIsTestNet] = useState(false);

	function onSwitchNetwork() {
		if (chain?.id === 97) {
			setIsTestNet(true);
		} else {
			setIsTestNet(false);
			switchChain({
				chainId: 97,
			});
		}
	}

	useEffect(() => {
		if (chain?.id === 97) {
			setIsTestNet(true);
		} else {
			setIsTestNet(false);
		}
	}, [chain]);

	return (
		<div className="h-[0.8rem] flex px-[0.24rem] justify-between relative text-[0.14rem] items-center border-b-[#E5E7EB] border-b-[1px] border-solid">
			<Link href="https://www.dedata.io/" target="_blank">
				<div className="w-[0.98rem] h-[0.33rem]">
					<Image src="/logo.png" alt="logo" width={0} height={0} className="w-full h-auto" priority />
				</div>
			</Link>
			<div className="flex items-center gap-[0.2rem]">
				{isTestNet && <div>BNB Chain Testnet</div>}
				{!isTestNet && address && (
					<div
						className="bg-[#E9EAEC] h-[40px] w-[1.6rem] text-[0.16rem] font-bold rounded-[0.12rem] text-[#000] text-center leading-[40px] cursor-pointer -mr-[0.2rem]"
						onClick={onSwitchNetwork}
					>
						Switch Network
					</div>
				)}
				<ConnectButton label="Connect Wallet" accountStatus="full" chainStatus="none" showBalance={false} />
			</div>
		</div>
	);
}
export default NavBar;

/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-25 23:00:46
 * @FilePath: /dedata-front/app/components/NavBar.tsx
 * @Description:
 */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSwitchChain, useAccount } from 'wagmi';

function NavBar() {
	const { chains, switchChain } = useSwitchChain();
	const { chain } = useAccount();

	function onSwitchNetwork() {
		if (chain && chain.id === 97) return;
		switchChain({
			chainId: 97,
		});
	}

	return (
		<div className="h-[0.8rem] flex px-[0.24rem] justify-between relative text-[0.14rem] items-center border-b-[#E5E7EB] border-b-[1px] border-solid">
			<Link href="https://www.dedata.io/" target="_blank">
				<div className="w-[0.98rem] h-[0.33rem]">
					<Image src="/logo.png" alt="logo" width={0} height={0} className="w-full h-auto" priority />
				</div>
			</Link>
			<div className="flex items-center gap-[0.2rem]">
				<div className="cursor-pointer" onClick={onSwitchNetwork}>
					BNB Chain Testnet
				</div>
				<ConnectButton label="Connect Wallet" accountStatus="full" chainStatus="none" showBalance={false} />
			</div>
		</div>
	);
}
export default NavBar;

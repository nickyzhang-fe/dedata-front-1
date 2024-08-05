/*
 * @Date: 2024-06-18 21:54:38
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-07-14 22:40:29
 * @FilePath: /dedata-front/app/components/ConnectWallet.tsx
 * @Description:
 */
import Image from 'next/image';
import Link from 'next/link';
import { useConnectModal } from '@rainbow-me/rainbowkit';

function ConnectWallet() {
	const { openConnectModal } = useConnectModal();
	return (
		<div className="flex flex-1 flex-col justify-center items-center bg-[#fff] rounded-[.16rem] ml-[0.24rem]">
			<div className="w-[1.6rem] h-[1.6rem]">
				<Image src="/empty.png" alt="logo" width={0} height={0} className="w-full h-auto" priority />
			</div>
			<span className="text-[0.16rem] leading-[0.21rem] mb-[0.26rem] -mt-[0.2rem]">
				Please Connect Wallet, support{' '}
				<Link className="text-[#3A54DF] font-bold" target="_blank" href="https://chainlist.org/chain/97">
					BSC testnet
				</Link>
				，apply{' '}
				<Link
					className="text-[#3A54DF] font-bold"
					target="_blank"
					href="https://www.bnbchain.org/en/testnet-faucet"
				>
					test BNB
				</Link>
			</span>
			{openConnectModal && (
				<div
					className="bg-[#3A54DF] h-[0.6rem] w-[2rem] text-[0.16rem] rounded-[0.16rem] text-[#fff] text-center leading-[0.6rem] cursor-pointer font-bold"
					onClick={openConnectModal}
				>
					+ Connect Wallet
				</div>
			)}
		</div>
	);
}
export default ConnectWallet;

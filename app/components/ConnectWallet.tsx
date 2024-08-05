import Image from 'next/image';
import Link from 'next/link';
import { useConnectModal } from '@rainbow-me/rainbowkit';

function ConnectWallet() {
	const { openConnectModal } = useConnectModal();
	return (
		<div className="flex flex-1 flex-col justify-center items-center bg-[#fff] rounded-[.16rem]">
			<div className="w-[1.6rem] h-[1.6rem]">
				<Image src="/empty.png" alt="logo" width={0} height={0} className="w-full h-auto" priority />
			</div>
			<span className="text-[0.16rem] leading-[0.21rem] mb-[0.26rem] -mt-[0.2rem]">
				Pleas Connect Wallet First
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

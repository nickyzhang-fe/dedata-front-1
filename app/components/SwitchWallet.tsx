/*
 * @Date: 2024-06-18 21:54:38
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-04 22:31:52
 * @FilePath: /dedata-front/app/components/SwitchWallet.tsx
 * @Description:
 */
import Image from 'next/image';
import { useSwitchChain, useAccount } from 'wagmi';

function ConnectWallet() {
	const { switchChain } = useSwitchChain();
	const { chain } = useAccount();
	// testnet network
	function onSwitchNetwork() {
		if (chain && chain.id === 97) return;
		switchChain({
			chainId: 97,
		});
	}
	return (
		<div className="flex flex-1 flex-col justify-center items-center bg-[#fff] rounded-[.16rem] ml-[0.24rem]">
			<div className="w-[1.6rem] h-[1.6rem]">
				<Image src="/empty.png" alt="logo" width={0} height={0} className="w-full h-auto" priority />
			</div>
			<span className="text-[0.20rem] leading-[0.21rem] mb-[0.26rem] -mt-[0.2rem]">Wrong Network</span>
			<span className="text-[0.16rem] leading-[0.21rem] mb-[0.26rem] -mt-[0.2rem]">
				Please switch to one of the supported networks
			</span>
			<div
				className="bg-[#3A54DF] h-[0.6rem] w-[2rem] text-[0.16rem] rounded-[0.16rem] text-[#fff] text-center leading-[0.6rem] cursor-pointer font-bold"
				onClick={onSwitchNetwork}
			>
				Switch Network
			</div>
		</div>
	);
}
export default ConnectWallet;

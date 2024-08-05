/*
 * @Date: 2024-06-08 06:21:25
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-10 00:07:24
 * @FilePath: /dedata-front/app/wagmi.tsx
 * @Description:
 */
import { arbitrum, base, mainnet, optimism, polygon, bscTestnet } from 'wagmi/chains';
import { getDefaultWallets, getDefaultConfig } from '@rainbow-me/rainbowkit';

const { wallets } = getDefaultWallets();

const newBscTestnet = {
	...bscTestnet,
	rpcUrls: {
		...bscTestnet.rpcUrls,
		default: {
			http: ['https://bsc-prebsc-dataseed.bnbchain.org'],
		},
		public: {
			http: ['https://bsc-prebsc-dataseed.bnbchain.org'],
		},
	},
};

export const config = getDefaultConfig({
	appName: 'Dedata',
	projectId: 'e29013f230e24e5306ff14ac99f55ea1',
	chains: [
		mainnet,
		polygon,
		optimism,
		arbitrum,
		base,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [newBscTestnet] : []),
	],
	ssr: true,
});

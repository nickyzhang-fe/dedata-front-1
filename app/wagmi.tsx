/*
 * @Date: 2024-06-08 06:21:25
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-17 21:48:21
 * @FilePath: /dedata-front/app/wagmi.tsx
 * @Description:
 */
// @ts-nocheck
import { arbitrum, base, mainnet, optimism, polygon, bscTestnet } from 'wagmi/chains';
import { getDefaultWallets, getDefaultConfig } from '@rainbow-me/rainbowkit';

const { wallets } = getDefaultWallets();

const newBscTestnet = {
	...(bscTestnet as any),
	rpcUrls: {
		default: {
			http: ['https://bsc-testnet-dataseed.bnbchain.org'],
		},
	},
};

export const config = getDefaultConfig({
	appName: 'Dedata',
	projectId: 'e29013f230e24e5306ff14ac99f55ea1',
	chains: [
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
			? [newBscTestnet]
			: [mainnet, polygon, optimism, arbitrum, base]),
	],
	ssr: true,
});

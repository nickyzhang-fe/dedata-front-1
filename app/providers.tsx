/*
 * @Date: 2024-06-04 22:20:34
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-11 23:33:51
 * @FilePath: /dedata-front/app/providers.tsx
 * @Description:
 */
'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { RainbowKitProvider, lightTheme, createAuthenticationAdapter } from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { arbitrum, base, mainnet, optimism, polygon, zora } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { SiweMessage } from 'siwe';
import { config } from './wagmi';

const queryClient = new QueryClient();

export function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const fetchingStatusRef = useRef(false);
	const verifyingRef = useRef(false);

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider
					locale="en"
					theme={lightTheme({
						accentColor: '#E9EAEC',
						accentColorForeground: 'black',
						borderRadius: 'large',
						fontStack: 'system',
						overlayBlur: 'none',
					})}
				>
					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

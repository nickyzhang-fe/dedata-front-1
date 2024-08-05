/*
 * @Date: 2024-06-04 22:20:34
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-04 22:40:14
 * @FilePath: /dedata-front/app/providers.tsx
 * @Description:
 */
'use client';

import * as React from 'react';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi';
import { DomProviders } from './domProviders';

const queryClient = new QueryClient();

export function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
					<DomProviders>{children}</DomProviders>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

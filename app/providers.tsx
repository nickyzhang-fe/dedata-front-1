/*
 * @Date: 2024-06-04 22:20:34
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-06 23:04:16
 * @FilePath: /dedata-front/app/providers.tsx
 * @Description:
 */
'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
	RainbowKitProvider,
	getDefaultWallets,
	getDefaultConfig,
	lightTheme,
	RainbowKitAuthenticationProvider,
	createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { arbitrum, base, mainnet, optimism, polygon, zora } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { SiweMessage } from 'siwe';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
	appName: 'Dedata',
	projectId: 'e29013f230e24e5306ff14ac99f55ea1',
	wallets: [
		...wallets,
		{
			groupName: 'Other',
			wallets: [argentWallet, trustWallet, ledgerWallet],
		},
	],
	chains: [mainnet, polygon, optimism, arbitrum, base, zora],
	ssr: true,
});

const queryClient = new QueryClient();

export function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
    const fetchingStatusRef = useRef(false);
    const verifyingRef = useRef(false);
	const [authStatus, setAuthStatus] = useState<AuthenticationStatus>('loading');
	useEffect(() => {
		const fetchStatus = async () => {
			if (fetchingStatusRef.current || verifyingRef.current) {
				return;
			}

			fetchingStatusRef.current = true;

			try {
				const response = await fetch('/api/me');
				const json = await response.json();
				setAuthStatus(json.address ? 'authenticated' : 'unauthenticated');
			} catch (_error) {
				setAuthStatus('unauthenticated');
			} finally {
				fetchingStatusRef.current = false;
			}
		};

		// 1. page loads
		fetchStatus();

		// 2. window is focused (in case user logs out of another window)
		window.addEventListener('focus', fetchStatus);
		return () => window.removeEventListener('focus', fetchStatus);
	}, []);
    const authAdapter = createAuthenticationAdapter({
        getNonce: async () => {
            console.log('----->getNonce');
            const response = await fetch('/api/nonce');
            return await response.text();
        },
    
        createMessage: ({ nonce, address, chainId }) => {
            console.log('----->createMessage', nonce, address, chainId);
            return new SiweMessage({
                domain: window.location.host,
                address,
                statement: 'Sign in with Ethereum to the app.',
                uri: window.location.origin,
                version: '1',
                chainId,
                nonce,
            });
        },
    
        getMessageBody: ({ message }) => {
            console.log('----->getMessageBody', message);
            return message.prepareMessage();
        },
    
        verify: async ({ message, signature }) => {
            fetchingStatusRef.current = true;

            try {
                const verifyRes = await fetch('/api/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message, signature }),
                });
                console.log('----->verify', verifyRes);
                return Boolean(verifyRes.ok);
            } catch (error) {
                console.log(error);
                
            } finally {
                fetchingStatusRef.current = false;
            }
        },
    
        signOut: async () => {
            console.log('----->signOut');
            await fetch('/api/logout');
        },
    });
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitAuthenticationProvider adapter={authAdapter} status={authStatus}>
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
				</RainbowKitAuthenticationProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

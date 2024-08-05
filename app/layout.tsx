/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-07-15 22:20:43
 * @FilePath: /dedata-front/app/layout.tsx
 * @Description:
 */
import type { Metadata } from 'next';
import '@rainbow-me/rainbowkit/styles.css';
import '@/app/style/index.scss';
import NavBar from '@/app/components/NavBar';
import SideBar from '@/app/components/SideBar';
import { Providers } from './providers';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
	title: 'Dedata',
	description: 'The data infrastructure of AI',
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
                        window.onresize = function () {
                            setRem();
                        };
                        function setRem() {
                            var html = document.getElementsByTagName("html")[0];
                            var designSize = 1440;
                            var clientWidth = document.documentElement.clientWidth;
							if (clientWidth < 1000) {
                                clientWidth = 1000;
                            }
                            var rem = (clientWidth * 100) / designSize;
                            html.style.fontSize = rem + "px";
                        }
                        setRem();
                    `,
					}}
				/>
			</head>
			<body>
				<AntdRegistry>
					<Providers>{children}</Providers>
				</AntdRegistry>
			</body>
		</html>
	);
}

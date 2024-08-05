/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-04 22:41:09
 * @FilePath: /dedata-front/next.config.mjs
 * @Description:
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: true,
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	env: {
		APP_ENV: process.env.APP_ENV,
	},
	webpack: (config) => {
		config.resolve.fallback = { fs: false, net: false, tls: false };
		config.externals.push('pino-pretty', 'encoding');
		return config;
	},
};

export default nextConfig;

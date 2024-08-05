/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: true,
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
	// async rewrites() {
	// 	return [{ source: '/v1/:path*', destination: `http://127.0.0.1:3000/:path*` }];
	// },
	// async headers() {
	// 	return [
	// 		{
	// 			source: '/:path*',
	// 			headers: [
	// 				{ key: 'Access-Control-Allow-Origin', value: '*' },
	// 				{ key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
	// 				{ key: 'Access-Control-Allow-Headers', value: 'Origin, X-Requested-With, Content-Type, Accept' },
	// 			],
	// 		},
	// 	];
	// },
};

export default nextConfig;

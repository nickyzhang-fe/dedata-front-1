/*
 * @Date: 2024-06-09 07:53:44
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-11 23:31:53
 * @FilePath: /dedata-front/app/lib/fetcher.tsx
 * @Description:
 */
import { Input, message } from 'antd';
export async function fetcher(url: string, options: any = {}) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
	const fetchOptions = {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
	};
	try {
		const response = await fetch(`${baseUrl}${url}`, fetchOptions);
		return await response.json();
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
}

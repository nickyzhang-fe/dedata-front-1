/*
 * @Date: 2024-06-09 07:53:44
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-04 22:36:49
 * @FilePath: /dedata-front/app/lib/fetcher.tsx
 * @Description:
 */
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

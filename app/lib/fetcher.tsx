/*
 * @Date: 2024-06-09 07:53:44
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-10 10:04:07
 * @FilePath: /dedata-front/app/lib/fetcher.tsx
 * @Description:
 */
export async function fetcher(url, options = {}) {
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
		if (!response.ok) {
			const error = await response.json();
			console.log(error);

			throw new Error(error.message || 'Something went wrong');
		}
		return await response.json();
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
}

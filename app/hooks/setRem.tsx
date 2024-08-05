/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-25 23:23:31
 * @FilePath: /dedata-front/app/hooks/setRem.tsx
 * @Description:
 */
'use client';

export default function setRem() {
	function handleResize() {
		const designSize = 1440;
		const clientWidth = document.documentElement.clientWidth;

		const rem = (clientWidth * 100) / designSize;
		document.documentElement.style.fontSize = rem + 'px';
	}
	window.addEventListener('resize', handleResize);
	handleResize();
}

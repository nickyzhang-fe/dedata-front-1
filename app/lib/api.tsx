/*
 * @Date: 2024-06-10 08:18:56
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-11 23:31:34
 * @FilePath: /dedata-front/app/lib/api.tsx
 * @Description:
 */
import { fetcher } from './fetcher';

/**
 * @description: 获取大盘数据
 * @param {*} address
 * @return {*}
 */
export async function getSummaryInfo(address: string = '') {
	return fetcher(`/v1/points/summary?address=${address}`);
}
/**
 * @description: 更新链数据
 * @param {*} body
 * @return {*}
 */
export async function updatePoints(body: any) {
	return fetcher(`/v1/points/onchain`, {
		method: 'POST',
		body: JSON.stringify(body),
	});
}
/**
 * @description: 获取当前用户的任务状态
 * @param {*} address
 * @return {*}
 */
export async function getPendingCase(address: string = '') {
	return fetcher(`/v1/cases/pending-case?address=${address}`);
}
/**
 * @description: 获取maker信息
 * @param {*} address
 * @return {*}
 */
export async function getMakerInfo(address: string = '', lang: string = 'en') {
	const option = {
		headers: {
			lang,
		},
	};
	return fetcher(`/v1/cases/make-case?address=${address}`, option);
}
/**
 * @description: 创建maker信息
 * @param {*} body
 * @return {*}
 */
export async function createMakerInfo(body: any) {
	return fetcher('/v1/cases/make-case', {
		method: 'POST',
		body: JSON.stringify(body),
	});
}
/**
 * @description: 获取Checker信息
 * @param {*} address
 * @return {*}
 */
export async function getCheckerInfo(address: string = '', lang: string = 'en') {
	const option = {
		headers: {
			lang,
		},
	};
	return fetcher(`/v1/cases/check-case?address=${address}`, option);
}
/**
 * @description: 创建Checker信息
 * @param {*} body
 * @return {*}
 */
export async function createCheckerInfo(body: any) {
	return fetcher('/v1/cases/check-case', {
		method: 'POST',
		body: JSON.stringify(body),
	});
}

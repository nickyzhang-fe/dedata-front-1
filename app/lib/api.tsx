/*
 * @Date: 2024-06-10 08:18:56
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-09 22:35:35
 * @FilePath: /dedata-front/app/lib/api.tsx
 * @Description:
 */
import { fetcher } from './fetcher';

/**
 * @description: get dashboard data
 * @param {*} address
 * @return {*}
 */
export async function getSummaryInfo(address: string = '') {
	return fetcher(`/v1/points/summary?address=${address}`);
}
/**
 * @description: update onchain
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
 * @description: get user task status
 * @param {*} address
 * @param {*} type 1: alpha 2: beta 3: image
 * @return {*}
 */
export async function getPendingCase(address: string = '', type: number = 1) {
	return fetcher(`/v1/cases/pending-case?address=${address}&type=${type}`);
}
/**
 * @description: get marker info
 * @param {*} address
 * @return {*}
 */
export async function getMakerInfo(address: string = '', lang: string = 'en', type: number = 1) {
	const option = {
		headers: {
			lang,
		},
	};
	return fetcher(`/v1/cases/make-case?address=${address}&type=${type}`, option);
}
/**
 * @description: create maker info
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
 * @description: get checker info
 * @param {*} address
 * @return {*}
 */
export async function getCheckerInfo(address: string = '', lang: string = 'en', type: number = 1) {
	const option = {
		headers: {
			lang,
		},
	};
	return fetcher(`/v1/cases/check-case?address=${address}&type=${type}`, option);
}
/**
 * @description: create checker info
 * @param {*} body
 * @return {*}
 */
export async function createCheckerInfo(body: any) {
	return fetcher('/v1/cases/check-case', {
		method: 'POST',
		body: JSON.stringify(body),
	});
}
/**
 * @description: get pending onchain
 * @param {*} address
 * @return {*}
 */
export async function getPendingOnchainTransactions(address: string = '') {
	return fetcher(`/v1/points/pending-onchain-transactions?address=${address}`);
}

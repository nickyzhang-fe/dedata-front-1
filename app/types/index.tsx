/*
 * @Date: 2024-06-22 08:18:16
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-29 16:12:00
 * @FilePath: /dedata-front/app/types/index.tsx
 * @Description:
 */
export interface DOnchain {
	oracleSignature: string;
	points: string[];
}

export enum OnchainStatus {
	INIT = 0, // to be processed
	PROCESSING = 1, // processing
	SUCCEED = 2, // succeed
	FAILED = 3, // failed or cancel
}

/*
 * @Date: 2024-06-09 20:25:43
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-16 14:49:01
 * @FilePath: /dedata-front/app/hooks/useOnchainPoints.tsx
 * @Description: 通过合约方式上链数据
 */
import { useState, useEffect } from 'react';
import { useSignMessage } from 'wagmi';
import { useAccount, useWriteContract } from 'wagmi';
import { contractABI, contractAddress } from '@/app/utils/contractABI';

function useOnchainPoints(params: any) {
	const contractConfig: any = {
		functionName: 'addPoints',
		address: contractAddress,
		abi: contractABI,
		args: [params],
	};

	const { data: nonce } = useWriteContract(contractConfig);

	return true;
}

export default useOnchainPoints;

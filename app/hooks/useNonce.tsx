/*
 * @Date: 2024-06-09 20:25:43
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-11 23:30:08
 * @FilePath: /dedata-front/app/hooks/useNonce.tsx
 * @Description: 通过合约方式获取nonce
 */
import { useState, useEffect } from 'react';
import { useSignMessage } from 'wagmi';
import { useAccount, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractABI, contractAddress } from '@/app/utils/contractABI';

function useNonce(address: string = '') {
	const contractConfig: any = {
		functionName: 'nonces',
		address: contractAddress,
		abi: contractABI,
		args: [address],
	};

	const { data: nonce } = useReadContract(contractConfig);

	return nonce;
}

export default useNonce;

/*
 * @Date: 2024-06-09 20:25:43
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-27 23:59:05
 * @FilePath: /dedata-front/app/hooks/useNonceRefetch.tsx
 * @Description: 通过合约方式获取nonce
 */
import { useState, useEffect, useCallback } from 'react';
import { useSignMessage } from 'wagmi';
import { useAccount, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractABI, contractAddress } from '@/app/utils/contractABI';

function useNonceRefetch(address: string = '', interval: number = 3000) {
	const [data, setData] = useState<any>(0);

	const contractConfig: any = {
		functionName: 'nonces',
		address: contractAddress,
		abi: contractABI,
		args: [address],
	};

	const { refetch } = useReadContract(contractConfig);

	const getNonce = useCallback(async () => {
		const { data: nonce } = await refetch();
		console.log('-------->nonce', nonce);
		setData(nonce);
	}, [refetch]);

	useEffect(() => {
		getNonce();
	}, [getNonce]);

	return {
		nonce: data,
		getNonce,
	};
}

export default useNonceRefetch;

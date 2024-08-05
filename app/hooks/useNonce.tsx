/*
 * @Date: 2024-06-09 20:25:43
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-04 22:32:36
 * @FilePath: /dedata-front/app/hooks/useNonce.tsx
 * @Description: get nonce through contract
 */
import { useReadContract } from 'wagmi';
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

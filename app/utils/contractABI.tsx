/*
 * @Date: 2024-06-09 21:10:47
 * @LastEditors: nickyzhang zhangxia2013105@163.com
 * @LastEditTime: 2024-06-09 22:17:16
 * @FilePath: /dedata-front/app/utils/contractABI.tsx
 * @Description:
 */
export const contractAddress = '0xFF45d2e4E35DdAdC12f6c5a853e9c4BA499e5538';

export const contractABI = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{ inputs: [], name: 'ECDSAInvalidSignature', type: 'error' },
	{
		inputs: [{ internalType: 'uint256', name: 'length', type: 'uint256' }],
		name: 'ECDSAInvalidSignatureLength',
		type: 'error',
	},
	{
		inputs: [{ internalType: 'bytes32', name: 's', type: 'bytes32' }],
		name: 'ECDSAInvalidSignatureS',
		type: 'error',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'account', type: 'address' },
			{ internalType: 'uint256', name: 'currentNonce', type: 'uint256' },
		],
		name: 'InvalidAccountNonce',
		type: 'error',
	},
	{ inputs: [], name: 'InvalidInitialization', type: 'error' },
	{ inputs: [], name: 'NotInitializing', type: 'error' },
	{
		inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
		name: 'OwnableInvalidOwner',
		type: 'error',
	},
	{
		inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
		name: 'OwnableUnauthorizedAccount',
		type: 'error',
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'uint64', name: 'version', type: 'uint64' }],
		name: 'Initialized',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'nonce', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'points', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'tasks', type: 'uint256' },
		],
		name: 'PointsAdded',
		type: 'event',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'user', type: 'address' },
			{
				components: [
					{ internalType: 'uint256', name: 'nonce', type: 'uint256' },
					{ internalType: 'uint256', name: 'points', type: 'uint256' },
					{ internalType: 'uint256', name: 'tasks', type: 'uint256' },
				],
				internalType: 'struct PointHelper.Point',
				name: 'point',
				type: 'tuple',
			},
			{ internalType: 'bytes', name: 'oracleSignature', type: 'bytes' },
		],
		name: 'addPoints',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'user', type: 'address' },
			{
				components: [
					{ internalType: 'uint256', name: 'nonce', type: 'uint256' },
					{ internalType: 'uint256', name: 'points', type: 'uint256' },
					{ internalType: 'uint256', name: 'tasks', type: 'uint256' },
				],
				internalType: 'struct PointHelper.Point',
				name: 'point',
				type: 'tuple',
			},
		],
		name: 'getMessageHash',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'pure',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '_owner', type: 'address' },
			{ internalType: 'address', name: '_oracle', type: 'address' },
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
		name: 'nonces',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'oracle',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [{ internalType: 'address', name: '_oracle', type: 'address' }],
		name: 'setOracle',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'userPoints',
		outputs: [
			{ internalType: 'uint256', name: 'points', type: 'uint256' },
			{ internalType: 'uint256', name: 'tasks', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
];

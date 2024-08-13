/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-12 23:45:28
 * @FilePath: /dedata-front/app/utils/constant.tsx
 * @Description:
 */
export const SUCCESS_CODE = '000000000';
/**
 * menu router
 */
export const MENUS = {
	DataTalk: [
		{
			id: 'Alpha',
			route: '/',
			title: 'DeArticle(Alpha)',
			icon: '/icon-dearticle.png',
		},
		{
			id: 'Beta',
			route: '/beta/',
			title: 'DeArticle(Beta)',
			icon: '/icon-dearticle.png',
		},
		{
			id: 'Image',
			route: '/image/',
			title: 'DeImage',
			icon: '/DeImage.png',
		},
		{
			id: 'others',
			route: '/others/',
			title: 'Others',
			icon: '/others.png',
		},
	],
	Profile: [
		{
			id: 'Points',
			route: '/points/',
			title: 'Points Center',
			icon: '/points.png',
		},
	],
};
export const ROUTERS = [
	{
		id: 'Alpha',
		route: '/',
		title: 'DeArticle(Alpha)',
		icon: '/icon-dearticle.png',
	},
	{
		id: 'Beta',
		route: '/beta',
		title: 'DeArticle(Beta)',
		icon: '/icon-dearticle.png',
	},
	{
		id: 'Image',
		route: '/image',
		title: 'DeImage',
		icon: '/DeImage.png',
	},
	{
		id: 'others',
		route: '/others',
		title: 'Others',
		icon: '/others.png',
	},
];
/**
 * language
 */
export const LANGUAGES = [
	{
		label: 'English',
		value: 'en',
	},
	{
		label: 'Chinese',
		value: 'cn',
	},
];
/**
 * maker checker
 */
export const ROLES = [
	{
		label: 'Maker',
		value: 1,
	},
	{
		label: 'Checker',
		value: 2,
	},
];

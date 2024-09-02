/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-29 22:12:38
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
			icon: '/DeArticle.png',
		},
		{
			id: 'Beta',
			route: '/beta/',
			title: 'DeArticle(Beta)',
			icon: '/DeArticle.png',
		},
		{
			id: 'Image',
			route: '/image/',
			title: 'DeImage',
			icon: '/DeImage.png',
		},
		{
			id: 'Audio',
			route: '/audio/',
			title: 'DeAudio',
			icon: '/DeAudio.png',
		},
		{
			id: 'others',
			route: '/others/',
			title: 'Others',
			icon: '/others.png',
		},
	],
	DataBazaar: [
		{
			id: 'DataBazaar',
			route: '/DataBazaar/',
			title: 'DataBazaar',
			icon: '/databazaar.png',
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
/**
 * promotion channels
 */
export const PROMOTION_CHANNELS = [
	{
		image: '/dedataai.png',
		title: 'Follow @DedataAI',
		icon: '/x.png',
		points: '20',
		href: 'https://x.com/DedataAI',
	},
	{
		image: '/tweetl.png',
		title: 'Retweet the Tweet',
		icon: '/x.png',
		points: '5',
		href: 'https://x.com/DedataAI/status/1811058674544300358',
	},
	{
		image: '/jointg.png',
		title: 'Join Telegram',
		icon: '/tg.png',
		points: '10',
		href: 'https://t.me/dedataio',
	},
];

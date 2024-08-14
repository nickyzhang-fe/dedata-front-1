/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-14 23:10:16
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
	},
	{
		image: '/tweetl.png',
		title: 'Retweet the TweetI',
		icon: '/x.png',
		points: '5',
	},
	{
		image: '/jointg.png',
		title: 'Join Telegram',
		icon: '/tg.png',
		points: '10',
	},
];

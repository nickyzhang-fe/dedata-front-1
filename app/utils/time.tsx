/*
 * @Date: 2024-08-25 23:11:47
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-25 23:22:21
 * @FilePath: /dedata-front/app/utils/time.tsx
 * @Description:
 */
/**
 * number to time
 * @param seconds
 * @returns
 */
export const secondsToTime = (timeStamp: number) => {
	let seconds = Math.ceil(timeStamp);
	if (seconds < 0) {
		return '00:00';
	}
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(remainingSeconds).padStart(2, '0');

	return `${formattedMinutes}:${formattedSeconds}`;
};

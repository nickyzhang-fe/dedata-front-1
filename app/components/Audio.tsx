/*
 * @Date: 2024-08-23 22:50:46
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-26 07:05:46
 * @FilePath: /dedata-front/app/components/audio.tsx
 * @Description:
 */
import { useEffect, useRef, useState } from 'react';
import { CanvasWaves } from './CanvasWaves';
import Image from 'next/image';
import { secondsToTime } from '@/app/utils/time';

let canvasInstance: any = null;
let totalTimes: number = 0;
function Audio({ url }: any) {
	const [audioStatus, setAudioStatus] = useState('play');
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [timeStr, setTimeStr] = useState('00:00');

	useEffect(() => {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement;
		if (canvas) {
			canvasInstance = new CanvasWaves(canvas, 3, 100, 100, 0.08);
		}
	}, []);

	useEffect(() => {
		const audioDom = audioRef.current;
		const handleEnded = () => {
			canvasInstance.reset();
			setAudioStatus('play');
		};
		const handleTimeUpdate = () => {
			const playTime = audioDom?.currentTime || 0;
			const remainingTime = totalTimes - playTime;
			setTimeStr(secondsToTime(remainingTime));
		};
		const handleDurationchange = () => {
			const timeStamp = audioDom?.duration || 0;
			totalTimes = timeStamp;
			setTimeStr(secondsToTime(timeStamp));
		};
		if (audioDom) {
			audioDom.addEventListener('ended', handleEnded);
			audioDom.addEventListener('timeupdate', handleTimeUpdate);
			audioDom.addEventListener('durationchange', handleDurationchange);
			return () => {
				console.log('componentWillUnmount....', audioRef);
				canvasInstance.reset();
				if (audioDom) {
					audioDom.currentTime = 0;
					audioDom.pause();
					audioDom.removeEventListener('ended', handleEnded);
					audioDom.removeEventListener('timeupdate', handleTimeUpdate);
					audioDom.removeEventListener('durationchange', handleDurationchange);
				}
			};
		}
		console.log(canvasInstance);
	}, []);
	const onPlay = () => {
		const audioDom: any = audioRef.current;
		if (audioStatus === 'play') {
			canvasInstance.play();
			if (audioDom) {
				audioDom.play();
			}
		} else {
			canvasInstance.reset();
			if (audioDom) {
				audioDom.pause();
			}
		}
		setAudioStatus(audioStatus === 'pause' ? 'play' : 'pause');
	};

	return (
		<div className="flex items-center flex-col">
			<div className="flex items-center gap-[0.3rem]">
				<div onClick={onPlay} className="cursor-pointer">
					{audioStatus === 'play' && (
						<Image
							src="/icon-play.png"
							alt="audio"
							width={0}
							height={0}
							className="w-[0.32rem] h-[0.32rem]"
							priority
						/>
					)}
					{audioStatus === 'pause' && (
						<Image
							src="/icon-pause.png"
							alt="audio"
							width={0}
							height={0}
							className="w-[0.32rem] h-[0.32rem]"
							priority
						/>
					)}
				</div>
				<canvas width={500} height={180} id="canvas"></canvas>
				<div className="text-[0.14rem] text-[#666]">{timeStr}</div>
			</div>
			<audio className="h-0" ref={audioRef} src={url} controls preload="auto" />
		</div>
	);
}

export default Audio;

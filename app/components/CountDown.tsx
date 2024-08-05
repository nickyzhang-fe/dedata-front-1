import { useEffect, useState } from 'react';

function CountDown({ hours = 0, minutes = 0, seconds = 0, resetTime = function () {} }) {
	const [paused, setPaused] = useState(false);
	const [over, setOver] = useState(false);

	const [time, setTime] = useState({
		hours,
		minutes,
		seconds,
	});

	const tick = () => {
		// 暂停，或已结束
		if (paused || over) return;
		if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) setOver(true);
		else if (time.minutes === 0 && time.seconds === 0)
			setTime({
				hours: time.hours - 1,
				minutes: 59,
				seconds: 59,
			});
		else if (time.seconds === 0)
			setTime({
				hours: time.hours,
				minutes: time.minutes - 1,
				seconds: 59,
			});
		else
			setTime({
				hours: time.hours,
				minutes: time.minutes,
				seconds: time.seconds - 1,
			});
	};
	// 重置
	const reset = () => {
		setTime({
			hours,
			minutes,
			seconds,
		});
		setPaused(false);
		setOver(false);
	};

	useEffect(() => {
		setTime({
			hours: 0,
			minutes: minutes,
			seconds: seconds,
		});
	}, [minutes, seconds]);

	useEffect(() => {
		let timerID = setInterval(() => tick(), 1000);
		if (time.minutes === 0 && time.seconds === 0) {
			resetTime();
		}
		return () => clearInterval(timerID);
	});

	return (
		<div className="text-[14px] text-[#000] mx-[0.1rem] w-[0.5rem]">
			{`${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}
		</div>
	);
}
export default CountDown;

/*
 * @Date: 2024-06-18 21:54:38
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-14 23:20:45
 * @FilePath: /dedata-front/app/components/Calendar.tsx
 * @Description:
 */
import { message } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

function Calendar() {
	const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const [date, setDate] = useState(new Date());
	function onSign() {
		message.info('Coming soon');
	}

	const daysOfMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const firstDayOfMonth = (year: number, month: number) => {
		return new Date(year, month, 1).getDay();
	};

	const renderWeeks = () => {
		return weeks.map((week, index) => (
			<div key={index} className="text-[0.14rem] w-[0.4rem] h-[0.4rem] leading-[0.4rem] text-center text-[#000]">
				{week}
			</div>
		));
	};
	const renderDates = () => {
		const days = [];

		const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
		const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

		for (let i = 0; i < firstDay; i++) {
			days.push(
				<div key={`empty-${i}`} className="text-[0.14rem] w-[0.4rem] h-[0.4rem] leading-[0.4rem] text-center" />
			);
		}
		for (let i = 1; i <= daysCount; i++) {
			days.push(
				<div
					key={i}
					className="text-[0.14rem] w-[0.4rem] h-[0.4rem] flex justify-center items-center cursor-pointer text-[#333]"
				>
					{i === date.getDate() ? (
						<Image
							src="/checkin.png"
							alt="DeArticle"
							width={0}
							height={0}
							className="w-[0.28rem] h-[0.28rem]"
							priority
							onClick={onSign}
						/>
					) : (
						i
					)}
				</div>
			);
		}
		return days;
	};
	return (
		<div className="flex flex-1 flex-col bg-[#fff] rounded-[.16rem] mt-[0.3rem]">
			<div className="bg-[#F5F5F5] rounded-[0.12rem]">
				<div className="text-[0.14rem] text-[#000] mx-auto h-[0.36rem] text-center leading-[0.36rem] border-b-[#E5E7EB] border-b-[1px] border-solid">
					{date.getFullYear()}-{date.getMonth() + 1}
				</div>

				<div className="flex w-[2.96rem] flex-wrap px-[0.08rem]">
					{renderWeeks()}
					{renderDates()}
				</div>
			</div>
		</div>
	);
}
export default Calendar;

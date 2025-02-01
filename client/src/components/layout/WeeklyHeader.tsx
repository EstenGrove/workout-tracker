import styles from "../../css/layout/WeeklyHeader.module.scss";
import {
	eachDayOfInterval,
	endOfWeek,
	getDate,
	getDay,
	startOfWeek,
} from "date-fns";
import { formatDate } from "../../utils/utils_dates";

type Props = {
	baseDate: string;
	onSelect: (day: Date | string) => void;
	selectedDate: Date | string;
};

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

const getDaysInWeek = (date: string): Date[] => {
	const daysInWeek: Date[] = eachDayOfInterval({
		start: startOfWeek(date),
		end: endOfWeek(date),
	});

	return daysInWeek;
};

type WeekDayProps = {
	weekDate: Date;
	weekDay: string;
	isSelected: boolean;
	selectDate: () => void;
};

const getDateCss = (isSelected: boolean) => {
	return {
		color: isSelected ? "var(--accent-blue)" : "",
		// borderBottom: isSelected ? "1px solid var(--accent)" : "none",
		// border: isSelected ? "1px solid var(--accent-blue)" : "none",
	};
};

const WeekDay = ({
	weekDay,
	weekDate,
	isSelected,
	selectDate,
}: WeekDayProps) => {
	const date = getDate(weekDate);

	const css = {
		color: isSelected ? "var(--accent-blue)" : "",
	};
	return (
		<div
			className={styles.WeekDay}
			onClick={selectDate}
			data-selected-date={isSelected}
		>
			<div className={styles.WeekDay_day} style={css}>
				{weekDay}
			</div>
			<div className={styles.WeekDay_date} style={getDateCss(isSelected)}>
				{date}
			</div>
		</div>
	);
};

const isSelectedDate = (
	selectedDate: Date | string,
	weekDate: Date | string
): boolean => {
	const selected = formatDate(selectedDate, "db");
	const day = formatDate(weekDate, "db");

	return selected === day;
};

const WeeklyHeader = ({ baseDate, onSelect, selectedDate }: Props) => {
	const daysInWeek = getDaysInWeek(baseDate);

	return (
		<div className={styles.WeeklyHeader}>
			<div className={styles.WeeklyHeader_week}>
				{daysInWeek &&
					daysInWeek.map((day, idx) => (
						<WeekDay
							key={getDay(day)}
							weekDate={day}
							weekDay={weekDays[idx]}
							selectDate={() => onSelect(day)}
							isSelected={isSelectedDate(selectedDate, day)}
						/>
					))}
			</div>
		</div>
	);
};

export default WeeklyHeader;

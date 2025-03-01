import styles from "../../css/layout/WeeklyHeaderScrollable.module.scss";
import {
	eachDayOfInterval,
	endOfWeek,
	getDate,
	getDay,
	startOfWeek,
	subWeeks,
} from "date-fns";
import { formatDate } from "../../utils/utils_dates";
import { useRef, useEffect, useState, useMemo } from "react";

type Props = {
	baseDate: string;
	onSelect: (name: string, day: Date | string) => void;
	onScroll?: (currentWeek: Date[]) => void;
	selectedDate: string;
};
type WeekDayProps = {
	weekDate: Date;
	weekDay: string;
	isSelected: boolean;
	onSelect: () => void;
};

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

// grabs each key/value pair & orders then & resets them to the object
const reorderObjKeys = (obj: Record<number, Date[]>) => {
	return Object.fromEntries(
		Object.entries(obj).sort(([a], [b]) => Number(b) - Number(a))
	);
};
const getDaysInWeek = (date: string): Date[] => {
	const daysInWeek: Date[] = eachDayOfInterval({
		start: startOfWeek(date),
		end: endOfWeek(date),
	});

	return daysInWeek;
};
const getWeeksInRange = (
	date: string,
	weekCount: number = 12
): Record<number, Date[]> => {
	const weeks = {} as Record<number, Date[]>;

	for (let i = 0; i < weekCount; i++) {
		const newBase = formatDate(subWeeks(date, i), "long");
		const newWeek = getDaysInWeek(newBase);
		weeks[i] = newWeek;
	}

	const orderedWeeks = reorderObjKeys(weeks);

	return orderedWeeks;
};

const WeekDay = ({ weekDay, weekDate, isSelected, onSelect }: WeekDayProps) => {
	const date = getDate(weekDate);

	return (
		<button
			type="button"
			className={
				isSelected ? `${styles.WeekDay} ${styles.isSelected}` : styles.WeekDay
			}
			onClick={onSelect}
			data-selected-date={isSelected}
		>
			<div
				className={styles.WeekDay_day}
				style={{
					color: isSelected ? "var(--accent-blue)" : "var(--text1_5)",
				}}
			>
				{weekDay}
			</div>
			<div
				className={styles.WeekDay_date}
				style={{
					color: isSelected ? "var(--accent-blue)" : "#fff",
				}}
			>
				{date}
			</div>
		</button>
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

type WeekProps = {
	isCurrent: boolean;
	daysInWeek: Date[];
	selectedDate: Date | string;
	onSelect: (name: string, day: Date | string) => void;
};

const Week = ({ daysInWeek, selectedDate, onSelect, isCurrent }: WeekProps) => {
	const weekRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;
		const scrollToView = () => {
			if (isCurrent) {
				weekRef.current?.scrollIntoView();
			}
		};

		scrollToView();

		return () => {
			isMounted = false;
		};
	}, [isCurrent]);

	return (
		<div ref={weekRef} className={styles.Week}>
			{daysInWeek &&
				daysInWeek.map((day, idx) => (
					<WeekDay
						key={getDay(day)}
						weekDate={day}
						weekDay={weekDays[idx]}
						onSelect={() => onSelect("startDate", day)}
						isSelected={isSelectedDate(selectedDate, day)}
					/>
				))}
		</div>
	);
};

// ##TODOS:
// - Order the weeks in their correct order!!!
// - Currently we're showing historical/past weeks as future (eg to the right of the current week!!!)

const WeeklyHeaderScrollable = ({
	baseDate,
	onSelect,
	onScroll,
	selectedDate,
}: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const weeksInRange = getWeeksInRange(baseDate);
	const orderedWeeks = Object.keys(weeksInRange).reverse();
	// Week that's currently in viewport, regardless of selected date
	const [visibleWeekIdx, setVisibleWeekIdx] = useState<number>(0);
	const visibleWeek = useMemo(() => {
		// look up week's ordered index, then use that to determine that week
		const idx = orderedWeeks[visibleWeekIdx];
		const week = weeksInRange[idx as keyof object];
		if (onScroll) {
			onScroll(week);
		}
		return week;
	}, [onScroll, orderedWeeks, visibleWeekIdx, weeksInRange]);

	const handleScroll = () => {
		if (!containerRef.current) return;
		const scrollLeft = containerRef.current.scrollLeft;
		const weekWidth = containerRef.current.children[0]?.clientWidth || 1;

		const newIdx = Math.round(scrollLeft / weekWidth);
		setVisibleWeekIdx(newIdx);
	};

	return (
		<div
			ref={containerRef}
			className={styles.WeeklyHeaderScrollable}
			onScroll={handleScroll}
		>
			{orderedWeeks.map((key, idx) => {
				const isThisWeek = idx === orderedWeeks.length - 1;
				const daysInWeek = weeksInRange[key as keyof object];

				return (
					<Week
						key={key}
						isCurrent={isThisWeek}
						daysInWeek={daysInWeek}
						selectedDate={selectedDate}
						onSelect={onSelect}
					/>
				);
			})}
		</div>
	);
};

export default WeeklyHeaderScrollable;

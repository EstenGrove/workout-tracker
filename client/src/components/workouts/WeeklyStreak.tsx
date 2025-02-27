import { isFuture } from "date-fns";
import sprite from "../../assets/icons/main.svg";
import styles from "../../css/workouts/WeeklyStreak.module.scss";
import { StreakDay } from "../../features/workouts/types";
import { Card, CardHeader, CardIcon, CardTitles } from "../layout/Card";
import {
	formatDateAsWeekDay,
	fromBackendFormat,
	parseDate,
} from "../../utils/utils_dates";
import ProgressCircle from "../ui/ProgressCircle";
import FadeIn from "../ui/FadeIn";

type Props = {
	title: string;
	streak: StreakDay[];
};

type StreakGoalProps = {
	streak: StreakDay;
};

const getPercent = (mins: number, goal: number) => {
	const rawPercent = (mins / goal) * 100;
	return Math.min(rawPercent, 100);
};

const GoalReached = () => {
	return (
		<div className={styles.GoalReached}>
			<svg className={styles.GoalReached_icon}>
				<use xlinkHref={`${sprite}#icon-gas-industry`}></use>
			</svg>
		</div>
	);
};

const StreakGoal = ({ streak }: StreakGoalProps) => {
	const { date, mins, goal } = streak;
	const percent = getPercent(mins, goal);
	const hasGoal = percent === 100;

	if (isFuture(date)) {
		return (
			<div className={styles.StreakGoal}>
				<ProgressCircle percentage={100} size={40} color="blank" />
			</div>
		);
	}
	return (
		<div className={styles.StreakGoal}>
			<div className={styles.StreakGoal_circle}>
				<ProgressCircle percentage={percent} size={40} color="blue" />
				{hasGoal && (
					<FadeIn>
						<GoalReached />
					</FadeIn>
				)}
			</div>
			<div className={styles.StreakGoal_day}>
				<DayLabel day={date} />
			</div>
		</div>
	);
};

const getWeekDayFromDate = (day: string) => {
	const prepared = parseDate(day).toString();
	const parsed = fromBackendFormat(prepared);
	const weekDay = formatDateAsWeekDay(parsed);
	return weekDay;
};

const DayLabel = ({ day }: { day: Date | string }) => {
	const weekDay = getWeekDayFromDate(day as string);
	const abbrevDay = weekDay.slice(0, 3);
	return (
		<div className={styles.DayLabel}>
			<div>{abbrevDay}</div>
		</div>
	);
};

type WeekStreakProps = {
	streak: StreakDay[];
};

const WeeksStreak = ({ streak }: WeekStreakProps) => {
	return (
		<div className={styles.WeeksStreak}>
			<div className={styles.WeeksStreak_days}>
				{streak &&
					streak.map((streak, idx) => {
						const key = streak.date.toString() + idx;

						return <StreakGoal key={key} streak={streak} />;
					})}
			</div>
		</div>
	);
};

const WeeklyStreak = ({ title, streak }: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardIcon icon="fire" color="var(--accent-red)" />
				<CardTitles title={title} />
			</CardHeader>
			<div className={styles.WeeklyStreak}>
				<WeeksStreak streak={streak} />
			</div>
		</Card>
	);
};

export default WeeklyStreak;

import { useEffect, useCallback, useState } from "react";
import styles from "../css/pages/WorkoutWeekPage.module.scss";
import { useQueryParams } from "../hooks/useQueryParams";
import { useAppDispatch } from "../store/store";
import { formatDate } from "../utils/utils_dates";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import {
	getUserWorkoutsByDate,
	getWorkoutSummaryByDate,
} from "../features/workouts/operations";
import WeeklyHeader from "../components/layout/WeeklyHeader";
import WorkoutsWeekHeader from "../components/workouts/WorkoutsWeekHeader";
import WeeklyStreak from "../components/workouts/WeeklyStreak";
import { StreakDay } from "../features/workouts/types";
import { startOfWeek } from "date-fns";
import CardsSection from "../components/layout/CardsSection";
import TodaysWorkouts from "../components/workouts/TodaysWorkouts";

const fakeStreak: StreakDay[] = [
	{ date: "2025-02-16", mins: 7, goal: 10 }, // Sunday
	{ date: "2025-02-17", mins: 3, goal: 10 },
	{ date: "2025-02-18", mins: 18, goal: 10 },
	{ date: "2025-02-19", mins: 13, goal: 10 },
	{ date: "2025-02-20", mins: 27, goal: 10 },
	{ date: "2025-02-21", mins: 4, goal: 10 },
	{ date: "2025-02-22", mins: 0, goal: 10 }, // Saturday
];

const WorkoutWeekPage = () => {
	const defaultDate = new Date();
	const dispatch = useAppDispatch();
	const { getParams, setParams } = useQueryParams();
	const currentUser = useSelector(selectCurrentUser);
	const base = getParams("selectedDate") as string;
	const baseDate = formatDate(base || defaultDate, "long");
	const [selectedDate, setSelectedDate] = useState<string>(baseDate);

	const selectDate = (date: Date | string) => {
		const dateStr = formatDate(date, "long");
		setSelectedDate(dateStr);
		setParams({
			selectedDate: dateStr,
		});
	};

	// Fetch summary data & user workouts scheduled for today
	const getWorkoutsData = useCallback(() => {
		const { userID } = currentUser;
		const start = startOfWeek(selectedDate, { weekStartsOn: 0 });
		const startDate = formatDate(start, "db");
		const params = { userID, targetDate: selectedDate };
		const summaryParams = {
			userID,
			startDate,
			endDate: selectedDate,
		};

		// dispatch(getUserWorkoutsByDate(params));
		dispatch(getWorkoutSummaryByDate(summaryParams));
	}, [currentUser, dispatch, selectedDate]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (selectedDate) {
			getWorkoutsData();
		}

		return () => {
			isMounted = false;
		};
	}, [getWorkoutsData, selectedDate]);

	return (
		<div className={styles.WorkoutWeekPage}>
			<div className={styles.WorkoutWeekPage_header}>
				<WorkoutsWeekHeader selectedDate={selectedDate} />
				<WeeklyHeader
					baseDate={baseDate}
					selectedDate={selectedDate}
					onSelect={selectDate}
				/>
			</div>
			<div className={styles.WorkoutWeekPage_main}>
				<CardsSection title="Goals" to="goals">
					<WeeklyStreak title="Daily Minutes Goal" streak={fakeStreak} />
				</CardsSection>
				<CardsSection title="Today's Workouts" to="list">
					<TodaysWorkouts workouts={[]} />
				</CardsSection>
			</div>
		</div>
	);
};

export default WorkoutWeekPage;

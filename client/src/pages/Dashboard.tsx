import styles from "../css/pages/Dashboard.module.scss";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import { CurrentUser } from "../features/user/types";
import { useAppDispatch } from "../store/store";
import { getUserByLogin } from "../features/user/operations";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import WeeklyHeader from "../components/layout/WeeklyHeader";
import RecentActivity from "../components/dashboard/RecentActivity";
import ActivityCard from "../components/dashboard/ActivityCard";
import RecentWorkouts from "../components/dashboard/RecentWorkouts";
import { getDashboardSummary } from "../features/dashboard/operations";
import { formatDate } from "../utils/utils_dates";
import {
	selectIsLoadingDashboard,
	selectRecentActivity,
	selectRecentWorkouts,
} from "../features/dashboard/dashboardSlice";
import Loader from "../components/layout/Loader";
import ActivityTotal from "../components/activity/ActivityTotal";

function formatSteps(num: number) {
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
	}
	return num.toString();
}

const Dashboard = () => {
	const dispatch = useAppDispatch();
	const baseDate = new Date().toString();
	const isLoading = useSelector(selectIsLoadingDashboard);
	const recentWorkouts = useSelector(selectRecentWorkouts);
	const recentActivity = useSelector(selectRecentActivity);
	const currentUser: CurrentUser = useSelector(selectCurrentUser);
	const [selectedDate, setSelectedDate] = useState<Date | string>(baseDate);
	const recentSteps: string = formatSteps(recentActivity.recentSteps);

	const selectDate = (date: Date | string) => {
		setSelectedDate(date);
	};

	const getDashboardData = useCallback(() => {
		if (selectedDate) {
			dispatch(
				getDashboardSummary({
					userID: currentUser.userID,
					targetDate: formatDate(selectedDate, "db"),
				})
			);
		}
	}, [currentUser.userID, dispatch, selectedDate]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		getDashboardData();

		return () => {
			isMounted = false;
		};
	}, [getDashboardData]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		dispatch(
			getUserByLogin({
				username: "estengrove99@gmail.com",
				password: "Tripper99",
			})
		);

		return () => {
			isMounted = false;
		};
	}, [dispatch]);

	return (
		<div className={styles.Dashboard}>
			<DashboardHeader currentUser={currentUser} />
			<WeeklyHeader
				baseDate={baseDate}
				onSelect={selectDate}
				selectedDate={selectedDate as string}
			/>
			{isLoading ? (
				<div className={styles.Dashboard_main}>
					<Loader>Loading...</Loader>
				</div>
			) : (
				<div className={styles.Dashboard_main}>
					<div className={styles.Dashboard_main_row}>
						<RecentActivity
							title="Recent Mins."
							activityData={recentActivity.recentMins}
						/>
					</div>
					<div className={styles.Dashboard_main_row}>
						{/* STEPS CARD */}
						<ActivityCard
							title="Steps"
							icon="badge"
							color="var(--accent-green)"
						>
							<ActivityTotal total={recentSteps} label="steps" />
						</ActivityCard>
						{/* CALORIES CARD */}
						<ActivityCard
							title="Calories"
							icon="fire"
							color="var(--accent-red)"
						>
							<ActivityTotal
								total={recentActivity.recentCalories}
								label="kcals"
							/>
						</ActivityCard>
					</div>
					<div className={styles.Dashboard_main_row}>
						<RecentWorkouts recentWorkouts={recentWorkouts} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;

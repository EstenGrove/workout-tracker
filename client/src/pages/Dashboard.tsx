import styles from "../css/pages/Dashboard.module.scss";
import { useState, useEffect } from "react";
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

const Dashboard = () => {
	const dispatch = useAppDispatch();
	const baseDate = new Date().toString();
	const [selectedDate, setSelectedDate] = useState<Date | string>(baseDate);
	const currentUser: CurrentUser = useSelector(selectCurrentUser);

	const selectDate = (date: Date | string) => {
		setSelectedDate(date);
	};

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
	}, []);

	return (
		<div className={styles.Dashboard}>
			<DashboardHeader currentUser={currentUser} />
			<WeeklyHeader
				baseDate={baseDate}
				onSelect={selectDate}
				selectedDate={selectedDate}
			/>
			<div className={styles.Dashboard_main}>
				<div className={styles.Dashboard_main_row}>
					<RecentActivity />
				</div>
				<div className={styles.Dashboard_main_row}>
					<ActivityCard title="Steps" icon="badge" color="var(--accent-green)">
						{/*  */}
						{/*  */}
					</ActivityCard>
					<ActivityCard title="Calories" icon="fire" color="var(--accent-red)">
						{/*  */}
						{/*  */}
					</ActivityCard>
				</div>
				<div className={styles.Dashboard_main_row}>
					<RecentWorkouts />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

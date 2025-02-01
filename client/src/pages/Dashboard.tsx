import styles from "../css/pages/Dashboard.module.scss";
import { useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import WeeklyHeader from "../components/layout/WeeklyHeader";

const fakeUser = {
	userID: "e8sld-81k34-lKdjhr",
	username: "EstenGrove",
	password: "1234",
	firstName: "Esten",
	lastName: "Grove",
	userAvatar: null,
};

const Dashboard = () => {
	const baseDate = new Date().toString();
	const [selectedDate, setSelectedDate] = useState<Date | string>(baseDate);

	const selectDate = (date: Date | string) => {
		setSelectedDate(date);
	};

	return (
		<div className={styles.Dashboard}>
			<DashboardHeader currentUser={fakeUser} />
			<WeeklyHeader
				baseDate={baseDate}
				onSelect={selectDate}
				selectedDate={selectedDate}
			/>
		</div>
	);
};

export default Dashboard;

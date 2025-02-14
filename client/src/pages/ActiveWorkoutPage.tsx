import styles from "../css/pages/ActiveWorkoutPage.module.scss";
import PageContainer from "../components/layout/PageContainer";
import { NavLink } from "react-router";

const ActiveWorkoutPage = () => {
	return (
		<PageContainer>
			<div className={styles.ActiveWorkoutPage}>
				<h2>Active Workout</h2>
				<NavLink to="/demo">Demo Tracker</NavLink>
			</div>
		</PageContainer>
	);
};

export default ActiveWorkoutPage;

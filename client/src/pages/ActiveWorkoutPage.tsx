import { NavLink } from "react-router";
import styles from "../css/pages/ActiveWorkoutPage.module.scss";
import PageContainer from "../components/layout/PageContainer";
import ActiveWorkout from "../components/workouts/ActiveWorkout";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import NavArrows from "../components/layout/NavArrows";

const showLink = false;

const ActiveWorkoutPage = () => {
	const currentUser = useSelector(selectCurrentUser);
	const relatedWorkout = null;
	return (
		<PageContainer>
			<div className={styles.ActiveWorkoutPage}>
				<NavArrows />
				<h2 style={{ marginBottom: "2rem" }}>Active Workout</h2>
				<ActiveWorkout currentUser={currentUser} workout={relatedWorkout} />

				{showLink && <NavLink to="/demo">Demo Tracker</NavLink>}
			</div>
		</PageContainer>
	);
};

export default ActiveWorkoutPage;

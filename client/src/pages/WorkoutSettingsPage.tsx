import styles from "../css/pages/WorkoutSettingsPage.module.scss";
import NavArrows from "../components/layout/NavArrows";
import PageContainer from "../components/layout/PageContainer";
import { PageTabButton, PageTabs } from "../components/layout/PageTabs";
import { Outlet, useNavigate } from "react-router";

const WorkoutSettingsPage = () => {
	const navigate = useNavigate();
	return (
		<PageContainer>
			<div className={styles.WorkoutSettingsPage}>
				<NavArrows onBack={() => navigate("/workouts")} />
				<h1>Workout Settings</h1>
				<div className={styles.WorkoutSettingsPage_nav}>
					<PageTabs>
						<PageTabButton to="" isEnd={true}>
							Settings
						</PageTabButton>
						<PageTabButton to="plans">Plans</PageTabButton>
						<PageTabButton to="equipment">Equipment</PageTabButton>
					</PageTabs>
				</div>
				<div className={styles.WorkoutSettingsPage_main}>
					<Outlet />
				</div>
			</div>
		</PageContainer>
	);
};

export default WorkoutSettingsPage;

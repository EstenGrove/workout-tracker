import { Outlet } from "react-router";
import NavArrows from "../components/layout/NavArrows";
import PageContainer from "../components/layout/PageContainer";
import { PageTabButton, PageTabs } from "../components/layout/PageTabs";
import styles from "../css/pages/MedicationSettingsPage.module.scss";

const MedicationSettingsPage = () => {
	return (
		<PageContainer>
			<div className={styles.MedicationSettingsPage}>
				<NavArrows />
				<h1>Medication Settings</h1>
				<PageTabs>
					<PageTabButton to="schedules">Schedules</PageTabButton>
					<PageTabButton to="history">Logs</PageTabButton>
					<PageTabButton to="list">Medications</PageTabButton>
				</PageTabs>
				<div className={styles.MedicationSettingsPage_outlet}>
					<Outlet />
				</div>
			</div>
		</PageContainer>
	);
};

export default MedicationSettingsPage;

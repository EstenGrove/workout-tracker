import NavArrows from "../components/layout/NavArrows";
import PageContainer from "../components/layout/PageContainer";
import styles from "../css/pages/MedicationSettingsPage.module.scss";

const MedicationSettingsPage = () => {
	return (
		<PageContainer>
			<div className={styles.MedicationSettingsPage}>
				<NavArrows />
				<h1>Medication Settings</h1>
				{/*  */}
				{/*  */}
			</div>
		</PageContainer>
	);
};

export default MedicationSettingsPage;

import styles from "../css/pages/MedicationDetailsPage.module.scss";
import PageContainer from "../components/layout/PageContainer";
import NavArrows from "../components/layout/NavArrows";

const MedicationDetailsPage = () => {
	return (
		<PageContainer>
			<div className={styles.MedicationDetailsPage}>
				<NavArrows />
				<h2>Medication Details</h2>
			</div>
		</PageContainer>
	);
};

export default MedicationDetailsPage;

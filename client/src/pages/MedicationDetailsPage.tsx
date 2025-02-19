import styles from "../css/pages/MedicationDetailsPage.module.scss";
import PageContainer from "../components/layout/PageContainer";
import NavArrows from "../components/layout/NavArrows";
import { useParams } from "react-router";
import { useCallback } from "react";
import { useMedDetails } from "../hooks/useMedDetails";
import { selectCurrentUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";

const MedicationDetailsPage = () => {
	const { id } = useParams();
	const medID = Number(id);
	const currentUser = useSelector(selectCurrentUser);
	const medDetails = useMedDetails({
		userID: currentUser.userID,
		medID: medID || 1,
	});
	const medication = medDetails?.med;

	console.log("medDetails", medDetails);

	return (
		<PageContainer>
			<div className={styles.MedicationDetailsPage}>
				<NavArrows />
				<h1>{medication?.medName}</h1>
			</div>
		</PageContainer>
	);
};

export default MedicationDetailsPage;

import styles from "../css/pages/MedicationDetailsPage.module.scss";
import PageContainer from "../components/layout/PageContainer";
import NavArrows from "../components/layout/NavArrows";
import { Outlet, useNavigate, useParams, useResolvedPath } from "react-router";
import { useMedDetails } from "../hooks/useMedDetails";
import { selectCurrentUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { PageTabButton, PageTabs } from "../components/layout/PageTabs";

const MedicationDetailsPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { pathname } = useResolvedPath(".");
	const currentUser = useSelector(selectCurrentUser);

	const medID = Number(id);
	const medDetails = useMedDetails({
		userID: currentUser.userID,
		medID: medID || 1,
	});
	const medication = medDetails?.med;

	// console.log("medDetails", medDetails);

	return (
		<div className={styles.MedicationDetailsPage}>
			<div className={styles.MedicationDetailsPage_header}>
				<NavArrows onBack={() => navigate("/meds")} />
				<h1 className={styles.MedicationDetailsPage_header_title}>
					{medication?.medName}
				</h1>
				<div className={styles.MedicationDetailsPage_header_nav}>
					<PageTabs>
						<PageTabButton to={pathname} isEnd>
							Details
						</PageTabButton>
						<PageTabButton to="logs">Logs</PageTabButton>
						<PageTabButton to="schedules">Schedules</PageTabButton>
					</PageTabs>
				</div>
			</div>

			<div className={styles.MedicationDetailsPage_main}>
				<Outlet />
			</div>
		</div>
	);
};

export default MedicationDetailsPage;

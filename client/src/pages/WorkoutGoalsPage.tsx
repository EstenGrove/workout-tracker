import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import NavArrows from "../components/layout/NavArrows";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/shared/Button";
import styles from "../css/pages/WorkoutGoalsPage.module.scss";
import AddGoal from "../components/goals/AddGoal";

const customCSS = {
	btn: {
		marginLeft: "auto",
		borderRadius: "5rem",
		backgroundColor: "var(--accent-blue)",
	},
};

const WorkoutGoalsPage = () => {
	const currentUser = useSelector(selectCurrentUser);
	const [showGoalsModal, setShowGoalsModal] = useState<boolean>(false);

	const openGoalsModal = () => {
		setShowGoalsModal(true);
	};
	const closeGoalsModal = () => {
		setShowGoalsModal(false);
	};

	return (
		<PageContainer>
			<div className={styles.WorkoutGoalsPage}>
				<NavArrows />
				<div className={styles.WorkoutGoalsPage_header}>
					<h1>Workout Goals</h1>
					<Button onClick={openGoalsModal} style={customCSS.btn}>
						New
					</Button>
				</div>
				<div className={styles.WorkoutGoalsPage_main}>
					{/*  */}
					{/*  */}
					{/*  */}
				</div>

				{showGoalsModal && (
					<AddGoal currentUser={currentUser} onClose={closeGoalsModal} />
				)}
			</div>
		</PageContainer>
	);
};

export default WorkoutGoalsPage;

import styles from "../css/pages/WorkoutsPage.module.scss";
import { useState } from "react";
import { CurrentUser } from "../features/user/types";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import Modal from "../components/layout/Modal";
import PageContainer from "../components/layout/PageContainer";
import AddQuickWorkout from "../components/workouts/AddQuickWorkout";

const WorkoutsPage = () => {
	const currentUser: CurrentUser = useSelector(selectCurrentUser);
	const [showWorkoutModal, setShowWorkoutModal] = useState<boolean>(false);

	const openWorkoutModal = () => {
		setShowWorkoutModal(true);
	};

	const closeWorkoutModal = () => {
		setShowWorkoutModal(false);
	};

	return (
		<PageContainer>
			<div className={styles.WorkoutsPage}>
				<h1>Workouts</h1>
				<button type="button" onClick={openWorkoutModal}>
					Add Workout
				</button>
			</div>

			{showWorkoutModal && (
				<Modal closeModal={closeWorkoutModal}>
					<AddQuickWorkout currentUser={currentUser} />
				</Modal>
			)}
		</PageContainer>
	);
};

export default WorkoutsPage;

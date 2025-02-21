import { useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/shared/Button";
import styles from "../css/pages/HistoryPage.module.scss";
import Modal from "../components/layout/Modal";
import LogWorkout from "../components/workouts/LogWorkout";

const HistoryPage = () => {
	const [showLogWorkoutModal, setShowLogWorkoutModal] =
		useState<boolean>(false);

	const openLogWorkoutModal = () => {
		setShowLogWorkoutModal(true);
	};
	const closeLogWorkoutModal = () => {
		setShowLogWorkoutModal(false);
	};

	return (
		<PageContainer>
			<div className={styles.HistoryPage}>
				<h1>HistoryPage</h1>
				<Button onClick={openLogWorkoutModal}>Log Workout</Button>

				{showLogWorkoutModal && (
					<Modal closeModal={closeLogWorkoutModal}>
						<LogWorkout />
					</Modal>
				)}
			</div>
		</PageContainer>
	);
};

export default HistoryPage;

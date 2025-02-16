import styles from "../css/pages/WorkoutsPage.module.scss";
import { useState } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { CurrentUser } from "../features/user/types";
import { selectCurrentUser } from "../features/user/userSlice";
import Modal from "../components/layout/Modal";
import PageContainer from "../components/layout/PageContainer";
import AddQuickWorkout from "../components/workouts/AddQuickWorkout";
import PageHeader from "../components/layout/PageHeader";

type AddBtnProps = {
	onClick: () => void;
};
const AddWorkoutButton = ({ onClick }: AddBtnProps) => {
	return (
		<button onClick={onClick} className={styles.AddWorkoutButton}>
			Add Workout
		</button>
	);
};
const StartWorkoutButton = ({ onClick }: AddBtnProps) => {
	return (
		<NavLink
			to="active"
			onClick={onClick}
			className={styles.StartWorkoutButton}
		>
			Start Workout
		</NavLink>
	);
};

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
		<div className={styles.WorkoutsPage}>
			<PageHeader title="Workouts" />
			<div className={styles.WorkoutsPage_main}>
				<AddWorkoutButton onClick={openWorkoutModal} />
				<StartWorkoutButton onClick={openWorkoutModal} />
			</div>

			{showWorkoutModal && (
				<Modal closeModal={closeWorkoutModal}>
					<AddQuickWorkout currentUser={currentUser} />
				</Modal>
			)}
		</div>
	);
};

export default WorkoutsPage;

import styles from "../css/pages/WorkoutsPage.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CurrentUser } from "../features/user/types";
import { selectCurrentUser } from "../features/user/userSlice";
import { useAppDispatch } from "../store/store";
import { getSharedAppData } from "../features/shared/operations";
import { getUserWorkouts } from "../features/workouts/operations";
import { UserWorkout, WorkoutCategory } from "../features/workouts/types";
import {
	selectWorkoutCategories,
	selectWorkoutsWithCategory,
} from "../features/shared/sharedSlice";
import Modal from "../components/layout/Modal";
import AddQuickWorkout from "../components/workouts/AddQuickWorkout";
import PageHeader from "../components/layout/PageHeader";
import WorkoutsView from "../components/workouts/WorkoutsView";

type AddBtnProps = {
	onClick: () => void;
};
const AddWorkoutButton = ({ onClick }: AddBtnProps) => {
	return (
		<button onClick={onClick} className={styles.AddWorkoutButton}>
			New
		</button>
	);
};

const WorkoutsPage = () => {
	const dispatch = useAppDispatch();
	const currentUser: CurrentUser = useSelector(selectCurrentUser);
	const categories: WorkoutCategory[] = useSelector(selectWorkoutCategories);
	const workouts: UserWorkout[] = useSelector(selectWorkoutsWithCategory);
	const [showWorkoutModal, setShowWorkoutModal] = useState<boolean>(false);

	const openWorkoutModal = () => {
		setShowWorkoutModal(true);
	};

	const closeWorkoutModal = () => {
		setShowWorkoutModal(false);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		dispatch(getSharedAppData(currentUser.userID));
		dispatch(getUserWorkouts(currentUser.userID));

		return () => {
			isMounted = false;
		};
	}, [currentUser.userID, dispatch]);

	return (
		<div className={styles.WorkoutsPage}>
			<div className={styles.WorkoutsPage_header}>
				<PageHeader title="Workouts">
					<AddWorkoutButton onClick={openWorkoutModal} />
				</PageHeader>
			</div>
			<div className={styles.WorkoutsPage_main}>
				<WorkoutsView
					workouts={workouts}
					categories={categories}
					currentUser={currentUser}
				/>
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

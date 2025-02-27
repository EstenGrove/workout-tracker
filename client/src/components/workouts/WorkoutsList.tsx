import styles from "../../css/workouts/WorkoutsList.module.scss";
import { UserWorkout } from "../../features/workouts/types";
import Workout from "./Workout";

type Props = {
	workouts: UserWorkout[];
};

const WorkoutsList = ({ workouts }: Props) => {
	return (
		<div className={styles.WorkoutsList}>
			{workouts &&
				workouts.map((workout, idx) => <Workout key={idx} workout={workout} />)}
		</div>
	);
};

export default WorkoutsList;

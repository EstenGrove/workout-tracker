import sprite from "../../assets/icons/main.svg";
import styles from "../../css/workouts/Workout.module.scss";
import { Activity } from "../../features/activity/types";
import { getActivityStyles } from "../../utils/utils_activity";
import { Workout as IWorkout } from "../../features/workouts/types";
import { addEllipsis } from "../../utils/utils_misc";
import { useNavigate } from "react-router";

type Props = {
	workout: IWorkout;
};

const TypeBadge = ({ activityType }: { activityType: Activity }) => {
	const { icon, color, bg } = getActivityStyles(activityType);
	const iconCSS = { fill: color };
	const bgCSS = { backgroundColor: bg };
	return (
		<div className={styles.TypeBadge} style={bgCSS}>
			<svg className={styles.TypeBadge_icon} style={iconCSS}>
				<use xlinkHref={`${sprite}#icon-${icon}`} />
			</svg>
		</div>
	);
};

const StartButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button type="button" onClick={onClick} className={styles.StartButton}>
			<svg className={styles.StartButton_icon}>
				<use xlinkHref={`${sprite}#icon-play`}></use>
			</svg>
		</button>
	);
};

const Workout = ({ workout }: Props) => {
	const navigate = useNavigate();
	const { activityType, workoutName, workoutMins } = workout;
	const name = addEllipsis(workoutName, 20);
	const length = workoutMins > 0 ? workoutMins + "m" : "Open";

	const goTo = () => {
		const id = workout.workoutID;
		navigate(id);
	};

	const goToStartWorkout = () => {
		const id = workout.workoutID;
		navigate(`/workouts/active/${id}`);
	};

	return (
		<div className={styles.Workout}>
			<div className={styles.Workout_top}>
				<div className={styles.Workout_top_badge}>
					<TypeBadge activityType={activityType} />
				</div>
				<div className={styles.Workout_top_title} onClick={goTo}>
					<h6>{name}</h6>
					<div className={styles.Workout_top_title_about}>{length}</div>
				</div>
				<div className={styles.Workout_top_more}>
					<svg className={styles.Workout_top_more_icon}>
						<use xlinkHref={`${sprite}#icon-dots-three-horizontal`}></use>
					</svg>
				</div>
			</div>
			<div className={styles.Workout_bottom}>
				<StartButton onClick={goToStartWorkout} />
			</div>
		</div>
	);
};

export default Workout;

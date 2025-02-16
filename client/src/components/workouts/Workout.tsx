import sprite from "../../assets/icons/main.svg";
import styles from "../../css/workouts/Workout.module.scss";
import { Activity } from "../../features/activity/types";
import { getActivityStyles } from "../../utils/utils_activity";
import { Workout as IWorkout } from "../../features/workouts/types";

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

const Workout = ({ workout }: Props) => {
	const { activityType } = workout;
	return (
		<div className={styles.Workout}>
			<div className={styles.Workout_top}>
				<div className={styles.Workout_top_badge}>
					<TypeBadge activityType={activityType} />
				</div>
				<div className={styles.Workout_top_title}>
					<h6>{activityType}</h6>
				</div>
				<div className={styles.Workout_top_more}>
					<svg className={styles.Workout_top_more_icon}>
						<use xlinkHref={`${sprite}#icon-dots-three-horizontal`}></use>
					</svg>
				</div>
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default Workout;

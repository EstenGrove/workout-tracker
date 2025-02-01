import styles from "../../css/dashboard/RecentWorkout.module.scss";
import sprite from "../../assets/icons/main.svg";
import { Activity } from "../../features/activity/types";
import { RecentWorkout as IRecentWorkout } from "../../features/dashboard/types";
import { getActivityStyles } from "../../utils/utils_activity";

type Props = {
	recentWorkout: IRecentWorkout;
	selectWorkout: (workout: IRecentWorkout) => void;
};

const TypeBadge = ({ activityType }: { activityType: Activity }) => {
	const { icon, color } = getActivityStyles(activityType);
	return (
		<div className={styles.TypeBadge}>
			<svg className={styles.TypeBadge_icon}>
				<use xlinkHref={`${sprite}#icon-${icon}`} />
			</svg>
			{/*  */}
			{/*  */}
		</div>
	);
};

const RecentWorkout = ({ recentWorkout, selectWorkout }: Props) => {
	const { activityType } = recentWorkout;
	return (
		<li className={styles.RecentWorkout}>
			<div className={styles.RecentWorkout_title}>
				<h6>{activityType}</h6>
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</li>
	);
};

export default RecentWorkout;

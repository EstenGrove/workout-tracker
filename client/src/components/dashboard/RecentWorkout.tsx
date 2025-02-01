import styles from "../../css/dashboard/RecentWorkout.module.scss";
import sprite from "../../assets/icons/main.svg";
import { Activity } from "../../features/activity/types";
import { RecentWorkout as IRecentWorkout } from "../../features/dashboard/types";
import { getActivityStyles } from "../../utils/utils_activity";
import { formatDateAsWeekDay } from "../../utils/utils_dates";

type Props = {
	recentWorkout: IRecentWorkout;
	selectWorkout: () => void;
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

const RecentWorkout = ({ recentWorkout, selectWorkout }: Props) => {
	const { activityType, workoutDate } = recentWorkout;
	const day = formatDateAsWeekDay(workoutDate);
	return (
		<li className={styles.RecentWorkout} onClick={selectWorkout}>
			<div className={styles.RecentWorkout_top}>
				<div className={styles.RecentWorkout_top_badge}>
					<TypeBadge activityType={activityType} />
				</div>
				<div className={styles.RecentWorkout_top_title}>
					<h6>{activityType}</h6>
				</div>
			</div>
			<div className={styles.RecentWorkout_details}>
				<div className={styles.RecentWorkout_details_info}>
					{/*  */}
					{/*  */}
				</div>
				<div className={styles.RecentWorkout_details_when}>{day}</div>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</li>
	);
};

export default RecentWorkout;

import styles from "../../css/dashboard/RecentWorkout.module.scss";
import sprite from "../../assets/icons/main.svg";
import { Activity } from "../../features/activity/types";
import { RecentWorkout as IRecentWorkout } from "../../features/dashboard/types";
import { getActivityStyles } from "../../utils/utils_activity";
import { formatDateAsWeekDay, formatDateTime } from "../../utils/utils_dates";
import { useState } from "react";
import MenuIcon from "../ui/MenuIcon";
import MenuDropdown from "../ui/MenuDropdown";

type Props = {
	recentWorkout: IRecentWorkout;
	onSelect?: (workout: IRecentWorkout) => void;
	onEdit?: (workout: IRecentWorkout) => void;
	onView?: (workout: IRecentWorkout) => void;
	onDelete?: (workout: IRecentWorkout) => void;
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
type MoreOptsProps = {
	viewLog: () => void;
	editLog: () => void;
	deleteLog: () => void;
};

const MoreOptions = ({ viewLog, editLog, deleteLog }: MoreOptsProps) => {
	return (
		<div className={styles.MoreOptions}>
			<li onClick={viewLog} className={styles.MoreOptions_item}>
				View
			</li>
			<li onClick={editLog} className={styles.MoreOptions_item}>
				Edit
			</li>
			<li onClick={deleteLog} className={styles.MoreOptions_item}>
				Delete
			</li>
		</div>
	);
};

type WorkoutAction = "SELECT" | "EDIT" | "VIEW" | "DELETE";

const RecentWorkout = ({
	recentWorkout,
	onSelect,
	onView,
	onEdit,
	onDelete,
}: Props) => {
	const { activityType, workoutDate, workoutName, startTime } = recentWorkout;
	const day = formatDateAsWeekDay(workoutDate);
	const startAt = formatDateTime(startTime, "short");
	const [showMore, setShowMore] = useState<boolean>(false);

	const openMoreOpts = () => {
		setShowMore(true);
	};
	const closeMoreOpts = () => {
		setShowMore(false);
	};

	const selectWorkoutAction = (
		type: WorkoutAction,
		workout: IRecentWorkout
	) => {
		switch (type) {
			case "SELECT": {
				return onSelect && onSelect(workout);
			}
			case "EDIT": {
				return onEdit && onEdit(workout);
			}
			case "VIEW": {
				return onView && onView(workout);
			}
			case "DELETE": {
				return onDelete && onDelete(workout);
			}
			default:
				throw new Error("Invalid action type: " + type);
		}
	};

	return (
		<li className={styles.RecentWorkout}>
			<div className={styles.RecentWorkout_top}>
				<div className={styles.RecentWorkout_top_badge}>
					<TypeBadge activityType={activityType} />
				</div>
				<div
					className={styles.RecentWorkout_top_head}
					onClick={() => selectWorkoutAction("SELECT", recentWorkout)}
				>
					<h6 className={styles.RecentWorkout_top_head_title}>{workoutName}</h6>
					<div className={styles.RecentWorkout_top_head_time}>{startAt}</div>
				</div>
				<div className={styles.RecentWorkout_top_more}>
					<MenuIcon openMenu={openMoreOpts} />

					{showMore && (
						<MenuDropdown closeMenu={closeMoreOpts}>
							<MoreOptions
								viewLog={() => selectWorkoutAction("VIEW", recentWorkout)}
								editLog={() => selectWorkoutAction("EDIT", recentWorkout)}
								deleteLog={() => selectWorkoutAction("DELETE", recentWorkout)}
							/>
						</MenuDropdown>
					)}
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

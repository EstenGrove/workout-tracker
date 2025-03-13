import styles from "../../css/history/WorkoutHistoryLog.module.scss";
import sprite from "../../assets/icons/main.svg";
import { Activity } from "../../features/activity/types";
import { WorkoutHistory } from "../../features/history/types";
import { getActivityStyles } from "../../utils/utils_activity";
import { differenceInHours, format } from "date-fns";
import { formatCustomDate } from "../../utils/utils_dates";
import MenuIcon from "../ui/MenuIcon";
import { useState } from "react";
import MenuDropdown from "../ui/MenuDropdown";

type Props = {
	entry: WorkoutHistory;
};

const getTimeMsg = (startTime: string, endTime: string) => {
	const greaterThan10Hours = differenceInHours(endTime, startTime) >= 10;

	const start = format(startTime, "h:mm a");

	if (greaterThan10Hours) {
		return "All Day";
	} else {
		return "at " + start;
	}
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

const MinsBadge = ({ mins }: { mins: number }) => {
	return (
		<div className={styles.MinsBadge}>
			<svg className={styles.MinsBadge_icon}>
				<use xlinkHref={`${sprite}#icon-time`}></use>
			</svg>
			<span>{mins}m</span>
		</div>
	);
};
const TimeBadge = ({
	startTime,
	endTime,
}: {
	startTime: string;
	endTime: string;
}) => {
	const time = getTimeMsg(startTime, endTime);
	return (
		<div className={styles.TimeBadge}>
			<span>{time}</span>
		</div>
	);
};

const WorkoutHistoryLog = ({ entry }: Props) => {
	const date = formatCustomDate(entry.workoutDate, "monthAndDay");
	const [showMore, setShowMore] = useState<boolean>(false);

	const openMoreOpts = () => {
		setShowMore(true);
	};
	const closeMoreOpts = () => {
		setShowMore(false);
	};

	return (
		<div className={styles.WorkoutHistoryLog}>
			<div className={styles.WorkoutHistoryLog_top}>
				<div className={styles.WorkoutHistoryLog_top_badge}>
					<TypeBadge activityType={entry.activityType} />
				</div>
				<div className={styles.WorkoutHistoryLog_top_name}>
					<div className={styles.WorkoutHistoryLog_top_name_title}>
						{entry.workoutName}
					</div>
					<div className={styles.WorkoutHistoryLog_top_name_date}>{date}</div>
				</div>
				<div className={styles.WorkoutHistoryLog_top_more}>
					<MenuIcon openMenu={openMoreOpts} />

					{showMore && (
						<MenuDropdown closeMenu={closeMoreOpts}>
							<li>View</li>
							<li>Edit</li>
							<li>Delete</li>
						</MenuDropdown>
					)}
				</div>
			</div>
			{/* SHOW SUMMARY OF WORKOUT */}
			<div className={styles.WorkoutHistoryLog_middle}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
			<div className={styles.WorkoutHistoryLog_bottom}>
				<MinsBadge mins={entry.recordedMins} />
				<TimeBadge startTime={entry.startTime} endTime={entry.endTime} />
			</div>
		</div>
	);
};

export default WorkoutHistoryLog;

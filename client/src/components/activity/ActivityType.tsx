import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/activity/ActivityType.module.scss";
import { Activity } from "../../features/activity/types";
import { getActivityStyles } from "../../utils/utils_activity";

type Props = {
	type: Activity;
	onClick?: () => void;
};

const ActivityType = ({ type, onClick }: Props) => {
	const { icon, color } = getActivityStyles(type);

	const handleClick = () => {
		return onClick && onClick();
	};

	return (
		<div
			onClick={handleClick}
			className={styles.ActivityType}
			style={{ backgroundColor: color }}
		>
			<svg className={styles.ActivityType_icon}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
		</div>
	);
};

export default ActivityType;

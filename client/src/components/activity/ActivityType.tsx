import { ComponentPropsWithoutRef } from "react";
import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/activity/ActivityType.module.scss";
import { Activity } from "../../features/activity/types";
import { getActivityStyles } from "../../utils/utils_activity";

interface ActivityProps {
	type: Activity;
	onClick?: () => void;
}

// @ts-expect-error: this is fine
interface Props extends ActivityProps, ComponentPropsWithoutRef<"div"> {}

const ActivityType = ({ type, onClick, ...rest }: Props) => {
	const { icon, color } = getActivityStyles(type);

	const handleClick = () => {
		return onClick && onClick();
	};

	return (
		<div
			onClick={handleClick}
			className={styles.ActivityType}
			{...rest}
			style={{ backgroundColor: color }}
		>
			<svg className={styles.ActivityType_icon}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
		</div>
	);
};

export default ActivityType;

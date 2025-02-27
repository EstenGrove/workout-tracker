import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/activity/WorkoutTypes.module.scss";
import { Activity } from "../../features/activity/types";
import { ACTIVITIES as defaultTypes } from "../../utils/utils_activity";

/**
 * WorkoutType: this is an activity type styled for selecting a workout activity
 */

type Props = {
	name?: string;
	selectedType: Activity;
	workoutTypes?: Activity[];
	onSelect: (name: string, value: Activity | string) => void;
};

type WorkoutTypeProps = {
	activity: Activity;
	onSelect: () => void;
	isSelected: boolean;
};

const activityIcons = {
	Walk: "walking-2",
	Stretch: "stretching-2",
	Strength: "dumbbell-2",
	Timed: "time",
	Cardio: "heart-with-pulse",
	Other: "nothing-found",
};

const WorkoutType = ({
	activity,
	onSelect,
	isSelected = false,
}: WorkoutTypeProps) => {
	const icon = activityIcons[activity];
	const css = {
		backgroundColor: isSelected
			? "rgba(0, 124, 255, 0.1)"
			: "var(--bg-foreground)",
		color: isSelected ? "var(--accent-blue)" : "var(--blueGrey300)",
		borderColor: isSelected ? "var(--accent-blue)" : "var(--blueGrey800)",
	};
	const iconCss = {
		fill: isSelected ? "var(--accent-blue)" : "var(--text1_5)",
	};
	return (
		<div onClick={onSelect} className={styles.WorkoutType} style={css}>
			<svg className={styles.WorkoutType_icon} style={iconCss}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
		</div>
	);
};

const WorkoutTypes = ({
	name = "workoutType",
	workoutTypes = defaultTypes,
	selectedType,
	onSelect,
}: Props) => {
	return (
		<div className={styles.WorkoutTypes}>
			{workoutTypes &&
				workoutTypes.map((type: Activity, idx: number) => (
					<div key={idx} className={styles.WorkoutTypes_item}>
						<WorkoutType
							key={type + idx}
							activity={type}
							isSelected={selectedType === type}
							onSelect={() => onSelect(name, type)}
						/>
						<span>{type}</span>
					</div>
				))}
			{/*  */}
		</div>
	);
};

export default WorkoutTypes;

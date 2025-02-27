import styles from "../../css/goals/GoalTypes.module.scss";
import sprite from "../../assets/icons/main.svg";
import { iconsMap } from "../../utils/utils_icons";
import { addEllipsis } from "../../utils/utils_misc";
import { GoalType as IGoalType } from "../../utils/utils_goals";

type Props = {
	goalTypes: IGoalType[];
	selectedType: string;
	onSelect: (type: IGoalType) => void;
};

// Types:
// - Calories (Daily, Weekly, Monthly)
// - Steps
// - Exercise Minutes
// - Gain Muscle
// - Lose Weight

type GoalTypeProps = {
	goalType: IGoalType;
	onSelect: () => void;
	isSelected: boolean;
};

const getColor = (icon: string) => {
	switch (icon) {
		case "steps": {
			return "var(--accent-blue)";
		}
		case "time": {
			return "var(--accent-yellow)";
		}
		case "calories2":
		case "calories": {
			return "var(--accent-red)";
		}
		default:
			return "var(--blueGrey700)";
	}
};

const GoalType = ({
	goalType,
	onSelect,
	isSelected = false,
}: GoalTypeProps) => {
	const { name, desc: goalDesc, icon } = goalType;
	const color = getColor(icon);
	const iconName = iconsMap[icon as keyof object];
	const title = addEllipsis(name, 20);
	// const desc = addEllipsis(goalDesc, 40);
	const desc = addEllipsis(goalDesc, 90);
	const css = {
		borderColor: isSelected ? "var(--accent-blue)" : "var(--blueGrey800)",
	};

	return (
		<div onClick={onSelect} className={styles.GoalType} style={css}>
			<div className={styles.GoalType_main}>
				<h4 className={styles.GoalType_main_title}>{title}</h4>
				<h4 className={styles.GoalType_main_desc}>{desc}</h4>
			</div>
			<div className={styles.GoalType_iconWrapper}>
				<svg
					className={styles.GoalType_iconWrapper_icon}
					style={{ fill: color }}
				>
					<use xlinkHref={`${sprite}#icon-${iconName}`}></use>
				</svg>
			</div>
		</div>
	);
};

const GoalTypes = ({ goalTypes, onSelect, selectedType }: Props) => {
	return (
		<div className={styles.GoalTypes}>
			{goalTypes &&
				goalTypes.map((type, idx) => (
					<GoalType
						key={type.typeID + "-" + idx}
						goalType={type}
						onSelect={() => onSelect(type)}
						isSelected={selectedType === type.name}
					/>
				))}
		</div>
	);
};

export default GoalTypes;

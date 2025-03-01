import styles from "../../css/goals/AddGoalSteps.module.scss";
import sprite from "../../assets/icons/main.svg";
import { ComponentPropsWithoutRef } from "react";
import { formatDate } from "../../utils/utils_dates";
import { GoalType, NewGoalValues } from "../../utils/utils_goals";
import { REPEAT_TYPES } from "../../utils/utils_recurring";
import TextArea from "../shared/TextArea";
import TextInput from "../shared/TextInput";
import GoalTypes from "./GoalTypes";
import DatePicker from "../shared/DatePicker";
import NumberInput from "../shared/NumberInput";
import RepeatTypes from "../form/RepeatTypes";
import InputWithSuffix from "../form/InputWithSuffix";

const customCSS = {
	select: {
		width: "100%",
	},
	input: {
		width: "100%",
		minWidth: "100%",
	},
	target: {
		width: "10rem",
	},
};
type GoalTypeProps = {
	goalTypes: GoalType[];
	selectedType: string;
	onSelect: (type: GoalType) => void;
};
type StepProps = {
	values: NewGoalValues;
	onSelect: (name: string, value: string | Date) => void;
	onChange: (name: string, value: string | number) => void;
};
type TargetHeaderProps = {
	title: string;
	icon: string;
	iconColor: string;
};
interface HeaderProps {
	title: string;
}
// @ts-expect-error: this is fine
interface StepHeaderProps
	extends HeaderProps,
		ComponentPropsWithoutRef<"header"> {}

const StepHeader = ({ title, ...rest }: StepHeaderProps) => {
	return (
		<header className={styles.StepHeader} {...rest}>
			<h2 className={styles.StepHeader_title}>{title}</h2>
		</header>
	);
};
const TargetHeader = ({
	title = "Set your goal",
	icon = "time",
	iconColor = "var(--accent-yellow)",
}: TargetHeaderProps) => {
	return (
		<div className={styles.TargetHeader}>
			<div className={styles.TargetHeader_wrapper}>
				<svg
					className={styles.TargetHeader_wrapper_icon}
					style={{ fill: iconColor }}
				>
					<use xlinkHref={`${sprite}#icon-${icon}`}></use>
				</svg>
			</div>
			<StepHeader title={title} style={{ textAlign: "left" }} />
		</div>
	);
};
const GoalTypesStep = ({
	goalTypes,
	onSelect,
	selectedType,
}: GoalTypeProps) => {
	return (
		<div className={styles.GoalTypesStep}>
			<StepHeader title="Choose a workout goal" />
			<GoalTypes
				goalTypes={goalTypes}
				onSelect={onSelect}
				selectedType={selectedType}
			/>
		</div>
	);
};
const AboutGoalStep = ({ values, onChange }: StepProps) => {
	return (
		<div className={styles.AboutGoalStep}>
			<StepHeader title="What's this goal called?" />
			<div className={styles.AboutGoalStep_about}>
				<label htmlFor="goalName">Name of this goal</label>
				<TextInput
					name="goalName"
					id="goalName"
					value={values.goalName}
					onChange={onChange}
				/>
			</div>
			<div className={styles.AboutGoalStep_about}>
				<label htmlFor="goalDesc">Add a description (optional)</label>
				<TextArea
					name="goalDesc"
					id="goalDesc"
					value={values.goalDesc}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
const GoalScheduleStep = ({ values, onSelect }: StepProps) => {
	return (
		<div className={styles.GoalScheduleStep}>
			<StepHeader title="When should this goal occur?" />
			<div className={styles.GoalScheduleStep_range}>
				<label htmlFor="startDate">Starts on:</label>
				<DatePicker
					name="startDate"
					id="startDate"
					value={values.startDate}
					onSelect={onSelect}
					style={customCSS.input}
				/>
			</div>
			<div className={styles.GoalScheduleStep_range}>
				<label htmlFor="endDate">Ends on:</label>
				<DatePicker
					name="endDate"
					id="endDate"
					value={values.endDate}
					onSelect={onSelect}
					style={customCSS.input}
				/>
			</div>
		</div>
	);
};
const GoalTargetStep = ({ values, onChange, onSelect }: StepProps) => {
	const metric = values.goalMetric;

	return (
		<div className={styles.GoalTargetStep}>
			{metric === "calories" && (
				<CaloriesTarget
					values={values}
					onChange={onChange}
					onSelect={onSelect}
				/>
			)}
			{metric === "steps" && (
				<StepsTarget values={values} onChange={onChange} onSelect={onSelect} />
			)}
			{metric === "reps" && (
				<RepsTarget values={values} onChange={onChange} onSelect={onSelect} />
			)}
			{metric === "minutes" && (
				<MinsTarget values={values} onChange={onChange} onSelect={onSelect} />
			)}
		</div>
	);
};
const CaloriesTarget = ({ values, onChange, onSelect }: StepProps) => {
	const repeatTypes = REPEAT_TYPES;
	const selection = values.frequency;
	console.log("values.frequency", values.frequency);
	return (
		<div className={styles.CaloriesTarget}>
			<div className={styles.CaloriesTarget_top}>
				<TargetHeader
					title="Set your calories goal"
					icon="caloric-energy"
					iconColor="var(--accent-red)"
				/>
			</div>
			<div className={styles.CaloriesTarget_input}>
				<InputWithSuffix
					name="goalTarget"
					id="goalTarget"
					value={values.goalTarget}
					onChange={onChange}
					suffix="kcals"
					icon="calories2"
					inputMode="numeric"
				/>
			</div>
			<div className={styles.CaloriesTarget_repeat}>
				<label htmlFor="frequency">How often does this repeat?</label>
				<RepeatTypes
					name="frequency"
					options={repeatTypes}
					onSelect={onSelect}
					selectedOption={selection}
				/>
			</div>
		</div>
	);
};
const StepsTarget = ({ values, onChange, onSelect }: StepProps) => {
	const repeatTypes = REPEAT_TYPES;
	return (
		<div className={styles.StepsTarget}>
			<div className={styles.StepsTarget_top}>
				<TargetHeader
					title="Set your steps goal"
					icon="step-length"
					iconColor="var(--accent-blue)"
				/>
			</div>
			<div className={styles.StepsTarget_input}>
				<InputWithSuffix
					name="goalTarget"
					id="goalTarget"
					value={values.goalTarget}
					onChange={onChange}
					suffix="steps"
					icon="steps"
					inputMode="numeric"
				/>
			</div>
			<div className={styles.StepsTarget_repeat}>
				<label htmlFor="frequency">How often does this repeat?</label>
				<RepeatTypes
					name="frequency"
					options={repeatTypes}
					selectedOption={values.frequency}
					onSelect={onSelect}
				/>
			</div>
		</div>
	);
};
const RepsTarget = ({ values, onChange }: StepProps) => {
	return (
		<div className={styles.RepsTarget}>
			<StepHeader title="Set your reps goal" />
			<div className={styles.RepsTarget_wrapper}>
				<svg className={styles.RepsTarget_wrapper_icon}>
					<use xlinkHref={`${sprite}#icon-gas-industry`}></use>
				</svg>
			</div>
			<label htmlFor="goalTarget">Reps to reach goal:</label>
			<NumberInput
				name="goalTarget"
				id="goalTarget"
				value={values.goalTarget}
				onChange={onChange}
				style={customCSS.target}
			/>
		</div>
	);
};
const MinsTarget = ({ values, onChange, onSelect }: StepProps) => {
	const repeatTypes = REPEAT_TYPES;
	return (
		<div className={styles.MinsTarget}>
			<div className={styles.MinsTarget_top}>
				<TargetHeader
					title="Set your minutes goal"
					icon="time"
					iconColor="var(--accent-yellow)"
				/>
			</div>
			<div className={styles.MinsTarget_input}>
				<InputWithSuffix
					name="goalTarget"
					id="goalTarget"
					value={values.goalTarget}
					onChange={onChange}
					suffix="mins"
					icon="time"
					inputMode="numeric"
				/>
			</div>
			<div className={styles.MinsTarget_repeat}>
				<label htmlFor="frequency">How often does this repeat?</label>
				<RepeatTypes
					name="frequency"
					options={repeatTypes}
					selectedOption={values.frequency}
					onSelect={onSelect}
				/>
			</div>
		</div>
	);
};

type GoalTypeSummaryProps = {
	goalType: string;
	goalName: string;
	frequency: string;
};

const GoalTypeSummary = ({
	goalType,
	goalName,
	frequency,
}: GoalTypeSummaryProps) => {
	const custom = getGoalStyles(goalType);
	const { color, icon } = custom;

	return (
		<div className={styles.GoalTypeSummary}>
			<div className={styles.GoalTypeSummary_title}>
				<svg className={styles.GoalTypeSummary_icon} style={{ fill: color }}>
					<use xlinkHref={`${sprite}#icon-${icon}`}></use>
				</svg>
				<span>{goalName}</span>
			</div>
			<div className={styles.RowItem}>
				<svg className={styles.RowItem_icon}>
					<use xlinkHref={`${sprite}#icon-guarantee`}></use>
				</svg>
				{goalType} ({frequency})
			</div>
		</div>
	);
};
const getGoalStyles = (icon: string) => {
	switch (icon) {
		case "Steps": {
			return {
				icon: "step-length",
				color: "var(--accent-blue)",
			};
		}
		case "Minutes":
		case "Exercise Minutes": {
			return {
				icon: "time",
				color: "var(--accent-yellow)",
			};
		}
		case "Calories": {
			return {
				icon: "caloric-energy",
				color: "var(--accent-red)",
			};
		}
		default:
			return {
				icon: "",
				color: "var(--blueGrey700)",
			};
	}
};

const getTargetDesc = (values: NewGoalValues) => {
	const { frequency } = values;
	const freqDesc = {
		Daily: "per day",
		Weekly: "per week",
		Monthly: "per month",
		Yearly: "per year",
		Custom: "per schedule",
		Never: "",
	};
	const desc = freqDesc[frequency as keyof object];

	return desc;
};

const getGoalMetric = (metric: string) => {
	switch (metric) {
		case "calories": {
			return "kcals";
		}
		case "minutes": {
			return "mins.";
		}
		case "steps": {
			return "steps";
		}

		default:
			return "";
	}
};

const GoalSummaryStep = ({ values }: StepProps) => {
	const {
		goalType,
		goalName,
		goalTarget,
		goalMetric,
		frequency,
		startDate,
		endDate,
	} = values;
	const metric = getGoalMetric(goalMetric);
	const targetDesc = getTargetDesc(values);

	return (
		<div className={styles.GoalSummaryStep}>
			<StepHeader title="Goal Summary" />
			<div className={styles.GoalSummaryStep_main}>
				<div className={styles.GoalSummaryStep_main_title}>
					<GoalTypeSummary
						goalType={goalType}
						goalName={goalName}
						frequency={frequency}
					/>
					<div className={styles.RowItem}>
						<svg className={styles.RowItem_icon}>
							<use xlinkHref={`${sprite}#icon-goal`}></use>
						</svg>
						Goal:{" "}
						<b>
							{goalTarget} {metric}
						</b>{" "}
						{targetDesc}
					</div>
					<div className={styles.RowItem}>
						<svg className={styles.RowItem_icon}>
							<use xlinkHref={`${sprite}#icon-date-to`}></use>
						</svg>
						<span>
							From <b> {formatDate(startDate, "long")} </b> {" to "}
							<b>{formatDate(endDate, "long")}</b>.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export {
	GoalTypesStep,
	AboutGoalStep,
	GoalScheduleStep,
	GoalTargetStep,
	GoalSummaryStep,
};

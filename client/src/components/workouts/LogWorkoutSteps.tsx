import styles from "../../css/workouts/LogWorkoutSteps.module.scss";
import sprite from "../../assets/icons/main2.svg";
import { Activity } from "../../features/activity/types";
import { ACTIVITIES as activityTypes } from "../../utils/utils_activity";
import {
	calculateEndTimeFromDuration,
	Effort,
	LogWorkoutValues,
} from "../../utils/utils_workouts";
import {
	ComponentPropsWithoutRef,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import { formatDate, formatTime } from "../../utils/utils_dates";
import { useSelector } from "react-redux";
import { selectUserWorkouts } from "../../features/workouts/workoutsSlice";
import DatePicker from "../shared/DatePicker";
import TimePicker from "../shared/TimePicker";
import Select, { SelectOption } from "../shared/Select";
import CounterInput from "../shared/CounterInput";
import MinutesSelector from "../shared/MinutesSelector";
import RangeInput from "../shared/RangeInput";
import TimerInput from "../shared/TimerInput";
import ActivityType from "../activity/ActivityType";

type StepProps = {
	values: LogWorkoutValues;
	onSelect: (name: string, value: string | Date | number) => void;
	onChange: (name: string, value: string | number) => void;
};
type SharedProps = {
	values: LogWorkoutValues;
	onChange: (name: string, value: string | number) => void;
	onSelect: (name: string, value: Date | string) => void;
};
type ActivityItemProps = {
	activity: Activity;
	onSelect: () => void;
	isSelected: boolean;
};
interface HeaderProps {
	title: string;
}
// @ts-expect-error: this is fine
interface StepHeaderProps
	extends HeaderProps,
		ComponentPropsWithoutRef<"header"> {}

const efforts = [
	{ value: "None", label: "None" },
	{ value: "Easy", label: "Easy" },
	{ value: "Moderate", label: "Moderate" },
	{ value: "Hard", label: "Hard" },
	{ value: "Strenuous", label: "Strenuous" },
];
const activityIcons = {
	Walk: "walking-2",
	Stretch: "stretching-2",
	Strength: "dumbbell-2",
	Timed: "time",
	Cardio: "heart-with-pulse",
	Other: "nothing-found",
};
const getEffortColor = (effort: string) => {
	switch (effort) {
		case "Easy": {
			return {
				color: "var(--accent-green)",
				fontStyle: "bold",
			};
		}
		case "Moderate": {
			return {
				color: "var(--accent-yellow)",
				fontStyle: "bold",
			};
		}
		case "Hard": {
			return {
				color: "var(--accent-red)",
				fontStyle: "bold",
			};
		}
		case "Strenuous": {
			return {
				color: "orange",
				fontStyle: "bold",
			};
		}
		default:
			return {
				color: "var(--blueGrey600)",
				fontStyle: "bold",
			};
	}
};
const StepHeader = ({ title, ...rest }: StepHeaderProps) => {
	return (
		<header className={styles.StepHeader} {...rest}>
			<h2 className={styles.StepHeader_title}>{title}</h2>
		</header>
	);
};
const StrengthFields = ({ values, onChange }: SharedProps) => {
	return (
		<div className={styles.StrengthFields}>
			<div className={styles.StrengthFields_row}>
				<label htmlFor="weight">Weight being lifted?</label>
				<CounterInput
					name="weight"
					id="weight"
					value={values.weight}
					onChange={onChange}
				/>
			</div>
			<div className={styles.StrengthFields_row}>
				<label htmlFor="reps">Number of reps?</label>
				<CounterInput
					name="reps"
					id="reps"
					value={values.reps}
					onChange={onChange}
				/>
			</div>
			<div className={styles.StrengthFields_row}>
				<label htmlFor="sets">Number of sets?</label>
				<CounterInput
					name="sets"
					id="sets"
					value={values.sets}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
const WalkFields = ({ values, onChange }: SharedProps) => {
	return (
		<div className={styles.WalkFields}>
			<div className={styles.WalkFields_row}>
				<label htmlFor="steps" style={{ marginBottom: "1rem" }}>
					How many steps?
				</label>
				<div
					style={{
						width: "100%",
						textAlign: "center",
						display: "flex",
						justifyContent: "center",
						fontSize: "1.6rem",
						marginBottom: "1rem",
						fontWeight: "600",
					}}
				>
					{Number(values.steps).toLocaleString()}
				</div>
				<RangeInput
					name="steps"
					id="steps"
					value={String(values.steps)}
					onChange={onChange}
					min={0}
					max={50000}
					step={100}
				/>
			</div>
			<div className={styles.WalkFields_row}>
				<label htmlFor="miles">How many miles?</label>
				<CounterInput
					name="miles"
					id="miles"
					value={values.miles}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
const StretchFields = ({ values, onChange }: SharedProps) => {
	return (
		<div className={styles.StretchFields}>
			<div className={styles.StretchFields_row}>
				<label htmlFor="steps" style={{ marginBottom: "1rem" }}>
					How many steps?
				</label>
				<div
					style={{
						width: "100%",
						textAlign: "center",
						display: "flex",
						justifyContent: "center",
						fontSize: "1.6rem",
						marginBottom: "1rem",
						fontWeight: "600",
					}}
				>
					{Number(values.steps).toLocaleString()}
				</div>
				<RangeInput
					name="steps"
					id="steps"
					value={String(values.steps)}
					onChange={onChange}
					min={0}
					max={50000}
					step={100}
				/>
			</div>
			<div className={styles.StretchFields_row}>
				<label htmlFor="miles">How many miles?</label>
				<CounterInput
					name="miles"
					id="miles"
					value={values.miles}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
const TimedFields = ({ values, onChange }: SharedProps) => {
	return (
		<div className={styles.TimedFields}>
			<div className={styles.TimedFields_row}>
				<label htmlFor="steps" style={{ marginBottom: "1rem" }}>
					How long was this workout?
				</label>
				<TimerInput
					name="workoutMins"
					value={values.workoutMins}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
const EffortLabel = ({ effort }: { effort: Effort }) => {
	const css = getEffortColor(effort);
	return (
		<div className={styles.EffortLabel} style={css}>
			{effort}
		</div>
	);
};
const ActivityItem = ({
	activity,
	onSelect,
	isSelected = false,
}: ActivityItemProps) => {
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
		<div onClick={onSelect} className={styles.ActivityItem} style={css}>
			<svg className={styles.ActivityItem_icon} style={iconCss}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
		</div>
	);
};
const ActivityStep = ({ values, onSelect }: StepProps) => {
	return (
		<div className={styles.ActivityStep}>
			<StepHeader title="What kind of workout?" />
			<div className={styles.ActivityStep_list}>
				{activityTypes &&
					activityTypes.map((type, idx) => (
						<div key={idx} className={styles.ActivityStep_list_item}>
							<ActivityItem
								key={type + idx}
								activity={type}
								isSelected={values.activityType === type}
								onSelect={() => onSelect("activityType", type)}
							/>
							<span>{type}</span>
						</div>
					))}
			</div>
		</div>
	);
};
const SelectWorkoutStep = ({ values, onSelect }: StepProps) => {
	const { activityType } = values;
	const workouts = useSelector(selectUserWorkouts);
	const workoutsForType: SelectOption[] = useMemo(() => {
		if (!activityType) {
			return workouts.map((option) => ({
				label: option.workoutName,
				value: option.workoutName,
			}));
		}

		return workouts
			.filter((workout) => workout.activityType === activityType)
			.map((option) => ({
				label: option.workoutName,
				value: option.workoutName,
			}));
	}, [activityType, workouts]);

	// auto-select the workout by activity type, if only one exists!
	const autoSelect = useCallback(() => {
		if (workoutsForType.length === 1) {
			const name = workoutsForType[0].value;
			onSelect("workout", name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;
		if (activityType && workoutsForType) {
			autoSelect();
		}

		return () => {
			isMounted = false;
		};
	}, [activityType, autoSelect, workoutsForType]);

	return (
		<div className={styles.SelectWorkoutStep}>
			<StepHeader title="Which workout?" />{" "}
			<div className={styles.SelectWorkoutStep_main}>
				<Select
					name="workout"
					id="workout"
					value={values.workout as string}
					onChange={onSelect}
					defaultValue="--Select--"
					options={[
						{ value: "Select", label: "--Select--" },
						...workoutsForType,
					]}
					style={{ width: "100%" }}
				/>
			</div>
		</div>
	);
};

const showStartAndEnd = false;

const WorkoutDateStep = ({ values, onSelect }: StepProps) => {
	return (
		<div className={styles.WorkoutDateStep}>
			<StepHeader title="When did this workout occur?" />
			<div className={styles.WorkoutDateStep_main}>
				<div className={styles.WorkoutDateStep_main_field}>
					<DatePicker
						id="workoutDate"
						name="workoutDate"
						onSelect={onSelect}
						value={values.workoutDate}
					/>
				</div>

				{showStartAndEnd && (
					<div className={styles.WorkoutDateStep_main_split}>
						<div className={styles.WorkoutDateStep_main_split_item}>
							<div>Start time</div>
							<TimePicker
								id="startTime"
								name="startTime"
								onChange={onSelect}
								value={values.startTime as string}
							/>
						</div>
						<div className={styles.WorkoutDateStep_main_split_item}>
							<div>End time</div>
							<TimePicker
								id="endTime"
								name="endTime"
								onChange={onSelect}
								value={values.endTime as string}
							/>
						</div>
					</div>
				)}

				{!showStartAndEnd && (
					<div className={styles.WorkoutDateStep_main_field}>
						<div>Start time</div>
						<TimePicker
							id="startTime"
							name="startTime"
							onChange={onSelect}
							value={values.startTime as string}
							style={{ width: "100%" }}
						/>
					</div>
				)}

				<div className={styles.WorkoutDateStep_main_minsfield}>
					<label htmlFor="workoutMins">How long was this workout?</label>
					<div className={styles.WorkoutDateStep_main_minsfield_mins}>
						<MinutesSelector
							name="workoutMins"
							minutes={values.workoutMins}
							onSelect={onSelect}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
const EffortStep = ({ values, onChange }: StepProps) => {
	return (
		<div className={styles.EffortStep}>
			<StepHeader title="How much effort was this workout?" />
			<div className={styles.EffortStep_row}>
				<Select
					name="effort"
					id="effort"
					value={values.effort}
					options={efforts}
					onChange={onChange}
					style={{ minWidth: "100%" }}
				/>
			</div>
		</div>
	);
};
const DetailsByTypeStep = ({ values, onChange, onSelect }: StepProps) => {
	const type = values.activityType;
	return (
		<div className={styles.DetailsByTypeStep}>
			<StepHeader title="Add workout details (optional)" />
			<div className={styles.DetailsByTypeStep_main}>
				{type === "Walk" && (
					<WalkFields values={values} onChange={onChange} onSelect={onSelect} />
				)}
				{type === "Strength" && (
					<StrengthFields
						values={values}
						onChange={onChange}
						onSelect={onSelect}
					/>
				)}
				{type === "Stretch" && (
					<StretchFields
						values={values}
						onChange={onChange}
						onSelect={onSelect}
					/>
				)}
				{type === "Timed" && (
					<TimedFields
						values={values}
						onChange={onChange}
						onSelect={onSelect}
					/>
				)}
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};
const WalkSummary = ({ values }: StepProps) => {
	const { miles, steps } = values;
	return (
		<div className={styles.WalkSummary}>
			<div className={styles.WalkSummary_item}>
				<svg className={styles.WalkSummary_item_icon}>
					<use xlinkHref={`${sprite}#icon-step-length`}></use>
				</svg>
				<span>
					Steps: <b>{Number(steps).toLocaleString()} steps</b>
				</span>
			</div>
			<div className={styles.WalkSummary_item}>
				<svg className={styles.WalkSummary_item_icon}>
					<use xlinkHref={`${sprite}#icon-track-order`}></use>
				</svg>
				<span>
					Distance: <b>{miles}mi</b>
				</span>
			</div>
		</div>
	);
};
const StrengthSummary = ({ values }: StepProps) => {
	const { reps, sets } = values;
	return (
		<div className={styles.StrengthSummary}>
			<div className={styles.StrengthSummary_item}>
				<svg className={styles.StrengthSummary_item_icon}>
					<use xlinkHref={`${sprite}#icon-curls-with-dumbbells-2`}></use>
				</svg>
				<span>
					Reps: <b>{reps}</b>
				</span>
			</div>
			<div className={styles.StrengthSummary_item}>
				<svg className={styles.StrengthSummary_item_icon}>
					<use xlinkHref={`${sprite}#icon-synchronize`}></use>
				</svg>
				<span>
					Sets: <b>{sets} sets</b>
				</span>
			</div>
		</div>
	);
};
const TimeDetailsSummary = ({ values }: StepProps) => {
	const { startTime: rawStart, workoutMins, workoutDate } = values;
	const startTime = rawStart as string;
	const endTime = calculateEndTimeFromDuration({
		startTime: startTime,
		date: workoutDate,
		mins: workoutMins,
	});
	const endStr = formatTime(endTime, "short");
	return (
		<div className={styles.TimeDetailsSummary}>
			<div className={styles.TimeDetailsSummary_item}>
				<svg className={styles.TimeDetailsSummary_item_icon}>
					<use xlinkHref={`${sprite}#icon-installment-plan`}></use>
				</svg>
				<span>
					Date: <b>{formatDate(workoutDate, "long")}</b>
				</span>
			</div>
			<div className={styles.TimeDetailsSummary_item}>
				<svg className={styles.TimeDetailsSummary_item_icon}>
					<use xlinkHref={`${sprite}#icon-time`}></use>
				</svg>
				<span>
					Duration: <b>{workoutMins}mins</b>
					<span>
						{"  "}({startTime} to {endStr})
					</span>
				</span>
			</div>
		</div>
	);
};

const WorkoutSummaryStep = ({ values, onChange, onSelect }: StepProps) => {
	const { activityType } = values;
	return (
		<div className={styles.WorkoutSummaryStep}>
			<StepHeader title="Workout Summary" />
			<div className={styles.WorkoutSummaryStep_main}>
				<div className={styles.WorkoutSummaryStep_main_type}>
					<ActivityType type={activityType as Activity} />
					<span>{activityType}</span>
				</div>
				<div className={styles.WorkoutSummaryStep_main_item}>
					<svg className={styles.WorkoutSummaryStep_main_item_icon}>
						<use xlinkHref={`${sprite}#icon-effort-2`}></use>
					</svg>
					Effort: <EffortLabel effort={values.effort} />
				</div>
				<TimeDetailsSummary
					values={values}
					onChange={onChange}
					onSelect={onSelect}
				/>
				{activityType === "Walk" && (
					<WalkSummary
						values={values}
						onChange={onChange}
						onSelect={onSelect}
					/>
				)}
				{activityType === "Strength" && (
					<StrengthSummary
						values={values}
						onChange={onChange}
						onSelect={onSelect}
					/>
				)}
			</div>
		</div>
	);
};

export {
	ActivityStep,
	WorkoutDateStep,
	EffortStep,
	SelectWorkoutStep,
	DetailsByTypeStep,
	WorkoutSummaryStep,
};

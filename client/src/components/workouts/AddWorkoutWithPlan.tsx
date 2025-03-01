import styles from "../../css/workouts/AddWorkoutWithPlan.module.scss";
import { useState } from "react";
import { CurrentUser } from "../../features/user/types";
import { Activity } from "../../features/activity/types";
import { RecurringValues, RepeatType } from "../../utils/utils_recurring";
import TextInput from "../shared/TextInput";
import TextArea from "../shared/TextArea";
import MultiStepModal, { StepItem } from "../shared/MultiStepModal";
import MinutesSelector from "../shared/MinutesSelector";
import WorkoutTypes from "../activity/WorkoutTypes";
import RecurringOptions from "../form/RecurringOptions";
import CustomCheckbox from "../shared/CustomCheckbox";
import DatePicker from "../shared/DatePicker";
import { formatDate } from "../../utils/utils_dates";
import CounterInput from "../shared/CounterInput";
import RangeInput from "../shared/RangeInput";
import TimerInput from "../shared/TimerInput";

type Props = {
	currentUser: CurrentUser;
	onClose: () => void;
};
type StepProps = {
	values: NewWorkoutValues;
	onChecked: (name: string, value: boolean) => void;
	onChange: (name: string, value: string | number) => void;
	onSelect: (name: string, value: string | Date) => void;
};
interface NewWorkoutValues {
	name: string;
	desc: string;
	length: number | string;
	activityType: Activity | string;
	workoutDate: Date | string;
	workoutMins: number;
	// weight
	weight: number;
	reps: number;
	sets: number;
	// steps
	steps: number;
	miles: number;
	// recurrence
	isRecurring: boolean;
	interval: number;
	frequency: RepeatType;
	byDay: string[];
	byMonth: number | string;
	byMonthDay: number | string;
	startDate: Date | string;
	endDate: Date | string;
}

const StepHeader = ({ title }: { title: string }) => {
	return (
		<div className={styles.StepHeader}>
			<h2 className={styles.StepHeader_title}>{title}</h2>
		</div>
	);
};
const StrengthFields = ({ values, onChange }: StepProps) => {
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
const WalkFields = ({ values, onChange }: StepProps) => {
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
						marginBottom: "2rem",
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
const StretchFields = ({ values, onChange }: StepProps) => {
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
const TimedFields = ({ values, onChange }: StepProps) => {
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

const ActivityStep = ({ values, onSelect }: StepProps) => {
	return (
		<div className={styles.ActivityStep}>
			<StepHeader title="What kind of exercise?" />
			<div className={styles.ActivityStep_main}>
				<WorkoutTypes
					name="activityType"
					selectedType={values.activityType as Activity}
					onSelect={onSelect}
				/>
			</div>
		</div>
	);
};
const WorkoutNameStep = ({ values, onChange }: StepProps) => {
	return (
		<div className={styles.WorkoutNameStep}>
			<StepHeader title="What's this workout called?" />
			<div className={styles.WorkoutNameStep_main}>
				<div className={styles.WorkoutNameStep_main_row}>
					<TextInput
						name="name"
						id="name"
						value={values.name}
						onChange={onChange}
					/>
				</div>
				<div className={styles.WorkoutNameStep_main_row}>
					<label htmlFor="desc">Add a description (optional)</label>
					<TextArea
						name="desc"
						id="desc"
						value={values.desc}
						onChange={onChange}
					/>
				</div>
			</div>
		</div>
	);
};
const DurationStep = ({ values, onChange }: StepProps) => {
	return (
		<div className={styles.DurationStep}>
			<StepHeader title="How long is this workout?" />
			<div className={styles.DurationStep_main}>
				<MinutesSelector
					name="workoutMins"
					minutes={values.workoutMins}
					onSelect={onChange}
				/>
			</div>
		</div>
	);
};
const ScheduleStep = ({ values, onChange, onChecked, onSelect }: StepProps) => {
	return (
		<div className={styles.ScheduleStep}>
			<StepHeader title="When should this workout occur?" />
			<div className={styles.ScheduleStep_main}>
				<div className={styles.ScheduleStep_main_date}>
					<DatePicker
						name="workoutDate"
						id="workoutDate"
						value={values.workoutDate}
						onSelect={onSelect}
					/>
				</div>
				<div className={styles.ScheduleStep_main_repeat}>
					<CustomCheckbox
						name="isRecurring"
						id="isRecurring"
						label="Repeat this workout"
						value={values.isRecurring}
						onChange={onChecked}
					/>
				</div>
				{values.isRecurring && (
					<div className={styles.ScheduleStep_main_options}>
						<RecurringOptions
							values={values as unknown as RecurringValues}
							onChange={onChange}
							onSelect={onSelect as () => void}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
const WorkoutPlanStep = ({
	values,
	onChange,
	onChecked,
	onSelect,
}: StepProps) => {
	const { activityType } = values;
	return (
		<div className={styles.WorkoutPlanStep}>
			<StepHeader title="Specify a workout plan? (optional)" />
			<div className={styles.WorkoutPlanStep_main}>
				{activityType === "Walk" && (
					<WalkFields
						values={values}
						onChange={onChange}
						onSelect={onSelect}
						onChecked={onChecked}
					/>
				)}
				{activityType === "Strength" && (
					<StrengthFields
						values={values}
						onChange={onChange}
						onSelect={onSelect}
						onChecked={onChecked}
					/>
				)}
				{activityType === "Stretch" && (
					<StretchFields
						values={values}
						onChange={onChange}
						onSelect={onSelect}
						onChecked={onChecked}
					/>
				)}
				{activityType === "Timed" && (
					<TimedFields
						values={values}
						onChange={onChange}
						onSelect={onSelect}
						onChecked={onChecked}
					/>
				)}
			</div>
		</div>
	);
};
const AddWorkoutWithPlan = ({ currentUser, onClose }: Props) => {
	const [newWorkout, setNewWorkout] = useState<NewWorkoutValues>({
		name: "Untitled Workout",
		desc: "",
		length: "None",
		workoutMins: 5, // mins
		activityType: "",
		workoutDate: new Date(),
		// strength
		weight: 20,
		sets: 4,
		reps: 20,
		// steps
		steps: 0,
		miles: 0,
		// additional
		isRecurring: false,
		byDay: [],
		byMonth: 0,
		byMonthDay: 0,
		interval: 1,
		frequency: "Daily",
		startDate: formatDate(new Date(), "long"),
		endDate: formatDate(new Date(), "long"),
	});

	const onChange = (name: string, value: string | number | boolean) => {
		setNewWorkout({
			...newWorkout,
			[name]: value,
		});
	};
	const onSelect = (name: string, value: Date | string) => {
		if (name === "byDay") {
			return onSelectDay(name, value as string);
		} else {
			setNewWorkout({
				...newWorkout,
				[name]: value,
			});
		}
	};
	const onChecked = (name: string, value: boolean) => {
		setNewWorkout({
			...newWorkout,
			[name]: value,
		});
	};

	const onSelectDay = (_: string, value: string) => {
		const { byDay } = newWorkout;
		if (byDay.includes(value)) {
			setNewWorkout({
				...newWorkout,
				byDay: [...byDay.filter((x) => x !== value)],
			});
		} else {
			setNewWorkout({
				...newWorkout,
				byDay: [...byDay, value],
			});
		}
	};

	const steps: StepItem[] = [
		{
			id: 1,
			title: "Activity Type",
			content: (
				<ActivityStep
					values={newWorkout}
					onChange={onChange}
					onSelect={onSelect}
					onChecked={onChecked}
				/>
			),
			next: 2,
			// validate: () => !!newWorkout.activityType,
			validate: () => true,
		},
		{
			id: 2,
			title: "Workout Name & Desc",
			content: (
				<WorkoutNameStep
					values={newWorkout}
					onChange={onChange}
					onSelect={onSelect}
					onChecked={onChecked}
				/>
			),
			prev: 1,
			next: 3,
			// validate: () => !!newWorkout.activityType,
			validate: () => true,
		},
		{
			id: 3,
			title: "Duration Step",
			content: (
				<DurationStep
					values={newWorkout}
					onChange={onChange}
					onSelect={onSelect}
					onChecked={onChecked}
				/>
			),
			prev: 2,
			next: 4,
			// validate: () => !!newWorkout.activityType,
			validate: () => true,
		},
		{
			id: 4,
			title: "Workout Plan Step",
			content: (
				<WorkoutPlanStep
					values={newWorkout}
					onChange={onChange}
					onSelect={onSelect}
					onChecked={onChecked}
				/>
			),
			prev: 3,
			next: 5,
			// validate: () => !!newWorkout.activityType,
			validate: () => true,
		},
		{
			id: 5,
			title: "Schedule Step",
			content: (
				<ScheduleStep
					values={newWorkout}
					onChange={onChange}
					onSelect={onSelect}
					onChecked={onChecked}
				/>
			),
			prev: 4,
			next: 6,
			// validate: () => !!newWorkout.activityType,
			validate: () => true,
		},
	];

	return (
		<>
			<MultiStepModal steps={steps} onClose={onClose} />
		</>
	);
};

export default AddWorkoutWithPlan;

import styles from "../../css/workouts/AddQuickWorkout.module.scss";
import { useState } from "react";
import { CurrentUser } from "../../features/user/types";
import { Activity } from "../../features/activity/types";
import ActivityTypes from "../activity/ActivityTypes";
import TextInput from "../shared/TextInput";
import TextArea from "../shared/TextArea";
import MultiStepModal, { StepItem } from "../shared/MultiStepModal";
import MinutesSelector from "../shared/MinutesSelector";
import WorkoutTypes from "../activity/WorkoutTypes";
import RecurringOptions from "../form/RecurringOptions";
import { RepeatType } from "../../utils/utils_recurring";

type Props = {
	currentUser: CurrentUser;
	onClose: () => void;
};

interface QuickWorkoutValues {
	name: string;
	desc: string;
	length: number | string;
	activityType: Activity | string;
	workoutDate: Date | string;
	workoutMins: number;
}

type RepeatLabel = "day" | "week" | "month" | "year" | "Never" | "Custom";

const lengthPresets = [5, 10, 15, 20, 25, 30, 45, 60, "None"];

type StepProps = {
	values: QuickWorkoutValues;
	onChange: (name: string, value: string | number) => void;
	onSelect: (name: string, value: string | Date) => void;
};

const StepHeader = ({ title }: { title: string }) => {
	return (
		<div className={styles.StepHeader}>
			<h2 className={styles.StepHeader_title}>{title}</h2>
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
const ScheduleStep = ({ values, onChange, onSelect }: StepProps) => {
	return (
		<div className={styles.ScheduleStep}>
			<StepHeader title="When should this workout occur?" />
			<div className={styles.ScheduleStep_main}>
				<RecurringOptions
					values={values}
					onChange={onChange}
					onSelect={onSelect}
				/>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};
const StepTemplate = ({ values, onChange, onSelect }: StepProps) => {
	return (
		<div className={styles.WorkoutNameStep}>
			<StepHeader title="What's this workout called?" />
			<div className={styles.WorkoutNameStep_main}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

const AddQuickWorkout = ({ currentUser, onClose }: Props) => {
	const [newWorkout, setNewWorkout] = useState<QuickWorkoutValues>({
		name: "Untitled Workout",
		desc: "",
		length: "None", // mins
		activityType: "",
		workoutDate: new Date(),
		workoutMins: 0,
		// additional
		byDay: [],
		byMonth: 0,
		byMonthDay: 0,
		interval: 1,
		frequency: "day",
	});

	const onChange = (name: string, value: string | number) => {
		setNewWorkout({
			...newWorkout,
			[name]: value,
		});
	};
	const onSelect = (name: string, value: Date | string) => {
		setNewWorkout({
			...newWorkout,
			[name]: value,
		});
	};

	const selectActivity = (type: Activity) => {
		if (newWorkout.activityType === type) {
			setNewWorkout({
				...newWorkout,
				activityType: "",
			});
		} else {
			setNewWorkout({
				...newWorkout,
				activityType: type,
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
				/>
			),
			prev: 2,
			next: 4,
			// validate: () => !!newWorkout.activityType,
			validate: () => true,
		},
		{
			id: 4,
			title: "Schedule Step",
			content: (
				<ScheduleStep
					values={newWorkout}
					onChange={onChange}
					onSelect={onSelect}
				/>
			),
			prev: 3,
			next: 5,
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

export default AddQuickWorkout;

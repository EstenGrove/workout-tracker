import { useState } from "react";
import styles from "../../css/workouts/LogWorkout.module.scss";
import { CurrentUser } from "../../features/user/types";
import DatePicker from "../shared/DatePicker";
import TimePicker from "../shared/TimePicker";
import { formatDate, formatTime } from "../../utils/utils_dates";
import Select from "../shared/Select";
import CounterInput from "../shared/CounterInput";

type Props = {
	currentUser: CurrentUser;
};

// COMMON ITEMS FOR EACH ACTIVITY TYPE & WORKOUT TYPE
// - Related Workout (eg. workoutID & name)
// - Workout Date
// - Start Time
// - End Time
// - Effort (EASY, MODERATE, HARD, ETC)
// - Workout Mins (duration)

interface LogWorkoutValues {
	workout: number | string;
	workoutDate: Date | string;
	startTime: Date | string;
	endTime: Date | string;
	effort: "Easy" | "Moderate" | "Hard" | "Strenuous" | "None";
	workoutMins: number;
	// Walk
	steps: number;
	miles: number;
	// Strength
	weight: number;
	// Strength/Yoga/Stretch etc
	reps: number;
	sets: number;
}

type SharedProps = {
	values: LogWorkoutValues;
	onChange: (name: string, value: string | number) => void;
	onSelect: (name: string, value: Date | string) => void;
};

const efforts = [
	{ value: "None", label: "None" },
	{ value: "Easy", label: "Easy" },
	{ value: "Moderate", label: "Moderate" },
	{ value: "Hard", label: "Hard" },
	{ value: "Strenuous", label: "Strenuous" },
];

const SharedFields = ({ values, onChange, onSelect }: SharedProps) => {
	return (
		<div className={styles.SharedFields}>
			<div className={styles.SharedFields_row}>
				<label htmlFor="workoutDate">What day was this workout for?</label>
				<DatePicker
					id="workoutDate"
					name="workoutDate"
					onSelect={onSelect}
					value={values.workoutDate}
				/>
			</div>
			<div className={styles.SharedFields_row}>
				<div
					className={styles.SharedFields_splitRow}
					style={{ justifyContent: "space-around" }}
				>
					<label htmlFor="startTime">When did it start?</label>
					<label htmlFor="endTime">When did it end?</label>
				</div>
				<div className={styles.SharedFields_splitRow}>
					<TimePicker
						id="startTime"
						name="startTime"
						onChange={onSelect}
						value={values.startTime as string}
					/>
					<TimePicker
						id="endTime"
						name="endTime"
						onChange={onSelect}
						value={values.endTime as string}
					/>
				</div>
			</div>
			<div className={styles.SharedFields_row}>
				<label htmlFor="startTime">When did it start?</label>
				<Select
					name="effort"
					id="effort"
					value={values.effort}
					options={efforts}
					onChange={onChange}
				/>
			</div>
			<div className={styles.SharedFields_row}>
				<label htmlFor="startTime">How long was this workout?</label>
				<CounterInput
					id="workoutMins"
					name="workoutMins"
					value={values.workoutMins}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};

const StrengthFields = ({ values, onChange, onSelect }: SharedProps) => {
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

const WalkFields = ({ values, onChange, onSelect }: SharedProps) => {
	return (
		<div className={styles.WalkFields}>
			<div className={styles.WalkFields_row}>
				<label htmlFor="steps">How many steps?</label>
				<CounterInput
					name="steps"
					id="steps"
					value={values.steps}
					onChange={onChange}
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

const initialState: LogWorkoutValues = {
	workout: "",
	workoutDate: formatDate(new Date(), "long"),
	startTime: formatTime(new Date(), "long"),
	endTime: formatTime(new Date(), "long"),
	workoutMins: 0,
	effort: "None",
	weight: 0,
	reps: 0,
	sets: 1,
	steps: 0,
	miles: 0,
};

const LogWorkout = ({ currentUser }: Props) => {
	const [values, setValues] = useState<LogWorkoutValues>(initialState);

	const onChange = (name: string, value: string | number) => {
		setValues({
			...values,
			[name]: value,
		});
	};
	const onSelect = (name: string, value: Date | string) => {
		setValues({
			...values,
			[name]: value,
		});
	};

	return (
		<div className={styles.LogWorkout}>
			<h2 className={styles.LogWorkout}>Log a Workout</h2>
			<SharedFields values={values} onChange={onChange} onSelect={onSelect} />
			<StrengthFields values={values} onChange={onChange} onSelect={onSelect} />
			<WalkFields values={values} onChange={onChange} onSelect={onSelect} />
		</div>
	);
};

export default LogWorkout;

import { useState } from "react";
import styles from "../../css/workouts/LogWorkout.module.scss";
import { CurrentUser } from "../../features/user/types";
import DatePicker from "../shared/DatePicker";
import TimePicker from "../shared/TimePicker";
import { formatDate, formatTime } from "../../utils/utils_dates";
import Select from "../shared/Select";
import CounterInput from "../shared/CounterInput";
import {
	LogWorkoutValues,
	prepareWorkoutHistory,
} from "../../utils/utils_workouts";
import {
	ActivityStep,
	DetailsByTypeStep,
	EffortStep,
	WorkoutDateStep,
	WorkoutSummaryStep,
} from "./LogWorkoutSteps";
import MultiStepModal, { StepItem } from "../shared/MultiStepModal";
import { useAppDispatch } from "../../store/store";
import { saveWorkoutHistory } from "../../features/workouts/operations";
import { addMinutes, differenceInMinutes } from "date-fns";

type Props = {
	currentUser: CurrentUser;
	onClose: () => void;
};

// COMMON ITEMS FOR EACH ACTIVITY TYPE & WORKOUT TYPE
// - Related Workout (eg. workoutID & name)
// - Workout Date
// - Start Time
// - End Time
// - Effort (EASY, MODERATE, HARD, ETC)
// - Workout Mins (duration)

const initialState: LogWorkoutValues = {
	activityType: "",
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

const LogWorkout = ({ currentUser, onClose }: Props) => {
	const dispatch = useAppDispatch();
	const [values, setValues] = useState<LogWorkoutValues>(initialState);

	const onChange = (name: string, value: string | number) => {
		setValues({
			...values,
			[name]: value,
		});
	};
	const onSelect = (name: string, value: Date | string | number) => {
		setValues({
			...values,
			[name]: value,
		});
	};

	const onDateTimeSelect = (name: string, value: Date | string | number) => {
		if (name === "endTime") {
			const diff = differenceInMinutes(value, values.startTime);
			onSelect(name, value);
			onSelect("workoutMins", diff);
		} else if (name === "workoutMins") {
			const end = addMinutes(values.startTime, Number(value));
			onSelect(name, value);
			onSelect("endTime", end);
		}
	};

	// get prev step when clicking 'Back' from Workout Summary step
	const getPrevStep = () => {
		const { activityType } = values;
		// types not requiring more details (eg. should skip Details step)
		const skipDetailsTypes = ["Timed", "Cardio", "Other"];
		if (skipDetailsTypes.includes(activityType)) {
			return 3;
		} else {
			return 4;
		}
	};

	// get next step when clicking 'Next' on Effort Step (since some types don't require more info)
	const getNextStep = () => {
		const { activityType } = values;
		// types not requiring more details (eg. should skip Details step)
		const skipDetailsTypes = ["Timed", "Cardio", "Other"];
		if (skipDetailsTypes.includes(activityType)) {
			return 5;
		} else {
			return 4;
		}
	};

	const saveWorkoutLog = () => {
		const { userID } = currentUser;
		const newValues = prepareWorkoutHistory(values);
		const params = { userID, newLog: newValues };

		console.log("params", params);
		// dispatch(saveWorkoutHistory(params));
		return onClose();
	};

	const steps: StepItem[] = [
		{
			id: 1,
			title: "Activity Type",
			content: (
				<ActivityStep values={values} onChange={onChange} onSelect={onSelect} />
			),
			next: 2,
			validate: () => true,
		},
		{
			id: 2,
			title: "When was this workout?",
			content: (
				<WorkoutDateStep
					values={values}
					onChange={onChange}
					onSelect={onSelect}
					// onSelect={onDateTimeSelect}
				/>
			),
			prev: 1,
			next: 3,
		},
		{
			id: 3,
			title: "Effort for this workout?",
			content: (
				<EffortStep values={values} onChange={onChange} onSelect={onSelect} />
			),
			prev: 2,
			next: getNextStep(),
		},
		{
			id: 4,
			title: "Workout Details",
			content: (
				<DetailsByTypeStep
					values={values}
					onChange={onChange}
					onSelect={onSelect}
				/>
			),
			prev: 3,
			next: 5,
		},
		{
			id: 5,
			title: "Workout Summary",
			content: (
				<WorkoutSummaryStep
					values={values}
					onChange={onChange}
					onSelect={onSelect}
				/>
			),
			prev: getPrevStep(),
		},
	];

	return (
		<>
			<MultiStepModal steps={steps} onClose={onClose} onSave={saveWorkoutLog} />
		</>
	);
};

export default LogWorkout;

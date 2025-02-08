import { useState } from "react";
import styles from "../../css/workouts/AddQuickWorkout.module.scss";
import { CurrentUser } from "../../features/user/types";
import ActivityTypes from "../activity/ActivityTypes";
import { Activity } from "../../features/activity/types";
import TextInput from "../shared/TextInput";
import TextArea from "../shared/TextArea";

type Props = { currentUser: CurrentUser };

interface QuickWorkoutValues {
	name: string;
	desc: string;
	length: number | string;
	activityType: Activity | string;
	workoutDate: Date | string;
}

type LengthOptsProps = {
	values: QuickWorkoutValues;
	selectLength: (length: number | string) => void;
};

const lengthPresets = [5, 10, 15, 20, 25, 30, 45, 60, "None"];

const isSelected = (
	preset: number | string,
	selectedPreset: number | string
): boolean => {
	return preset === selectedPreset;
};

const LengthOptions = ({ values, selectLength }: LengthOptsProps) => {
	return (
		<div className={styles.LengthOptions}>
			{lengthPresets &&
				lengthPresets.map((preset) => (
					<button
						key={preset}
						type="button"
						onClick={() => selectLength(preset)}
						className={styles.LengthOptions_preset}
						data-selected={isSelected(preset, values.length)}
					>
						{typeof preset === "number" ? preset + "m" : preset}
					</button>
				))}
		</div>
	);
};

const AddQuickWorkout = ({ currentUser }: Props) => {
	const [newWorkout, setNewWorkout] = useState<QuickWorkoutValues>({
		name: "Untitled",
		desc: "",
		length: "None", // mins
		activityType: "",
		workoutDate: new Date(),
	});

	const handleChange = (name: string, value: string) => {
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

	const selectLength = (preset: number | string) => {
		if (newWorkout.length === preset) {
			setNewWorkout({
				...newWorkout,
				length: 0,
			});
		} else {
			setNewWorkout({
				...newWorkout,
				length: preset,
			});
		}
	};

	return (
		<div className={styles.AddQuickWorkout}>
			<header className={styles.AddQuickWorkout_header}>
				<h2>Add a Workout</h2>
			</header>
			<div className={styles.AddQuickWorkout_types}>
				<label htmlFor="activityType">Select an activity</label>
				<ActivityTypes selectActivity={selectActivity} />
			</div>
			<div className={styles.AddQuickWorkout_about}>
				<div className={styles.AddQuickWorkout_about_field}>
					<label htmlFor="name">What's this workout called?</label>
					<TextInput
						name="name"
						id="name"
						value={newWorkout.name}
						onChange={handleChange}
						onFocus={(ref) => ref.currentTarget.select()}
					/>
				</div>
				<div className={styles.AddQuickWorkout_about_field}>
					<label htmlFor="desc">
						Add a description <span>(optional)</span>
					</label>
					<TextArea
						name="desc"
						id="desc"
						value={newWorkout.desc}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className={styles.AddQuickWorkout_mins}>
				<label htmlFor="length">
					Workout Length <span>(optional)</span>
				</label>
				<LengthOptions values={newWorkout} selectLength={selectLength} />
			</div>

			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default AddQuickWorkout;

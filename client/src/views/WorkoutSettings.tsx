import { useState } from "react";
import styles from "../css/views/WorkoutSettings.module.scss";
import CustomCheckbox from "../components/shared/CustomCheckbox";
import RadioButton from "../components/shared/RadioButton";

interface IWorkoutSettings {
	historyUI: "Weekly" | "Range";
	showWeeklyOnHistory: boolean;
	showRangeOnHistory: boolean;
}

const WorkoutSettings = () => {
	const [workoutSettings, setWorkoutSettings] = useState<IWorkoutSettings>({
		historyUI: "Weekly",
		showWeeklyOnHistory: true,
		showRangeOnHistory: false,
	});
	const { historyUI } = workoutSettings;

	const onChecked = (name: string, value: boolean) => {
		setWorkoutSettings({
			...workoutSettings,
			[name]: value,
		});
	};
	const onRadioChange = (name: string, value: string) => {
		setWorkoutSettings({
			...workoutSettings,
			[name]: value,
		});
	};

	console.log("historyUI", historyUI);

	return (
		<div className={styles.WorkoutSettingsView}>
			<div className={styles.WorkoutSettingsView_section}>
				<RadioButton
					key="Weekly"
					id="Weekly"
					name="historyUI" // group
					label="Show Weekly UI"
					value={historyUI === "Weekly"}
					onGroupChange={onRadioChange}
				/>
				<br />
				<RadioButton
					key="Range"
					id="Range"
					name="historyUI" // group
					label="Show Range UI"
					value={historyUI === "Range"}
					onGroupChange={onRadioChange}
				/>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WorkoutSettings;

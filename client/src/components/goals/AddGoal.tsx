import { useState } from "react";
import { formatDate } from "../../utils/utils_dates";
import { CurrentUser } from "../../features/user/types";
import {
	AboutGoalStep,
	GoalScheduleStep,
	GoalSummaryStep,
	GoalTargetStep,
	GoalTypesStep,
} from "./AddGoalSteps";
import { GoalType, NewGoalValues } from "../../utils/utils_goals";
import MultiStepModal, { StepItem } from "../shared/MultiStepModal";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";

type Props = {
	currentUser: CurrentUser;
	onClose: () => void;
};

const goalTypes = [
	{
		typeID: 6,
		name: "Exercise Minutes",
		desc: "Set a goal for exercise minutes.",
		unit: "minutes",
		icon: "time",
		isActive: true,
		createdDate: "",
	},
	{
		typeID: 5,
		name: "Steps",
		desc: "Set a steps goal.",
		unit: "steps",
		icon: "steps",
		isActive: true,
		createdDate: "",
	},
	{
		typeID: 4,
		name: "Calories",
		desc: "Set a goal for cardio exercise.",
		unit: "calories",
		icon: "calories2",
		isActive: true,
		createdDate: "",
	},
];

const AddGoal = ({ currentUser, onClose }: Props) => {
	useBackgroundBlur();
	const [newGoal, setNewGoal] = useState<NewGoalValues>({
		goalType: "", // Calories, Minutes, Steps etc
		goalName: "Untitled Goal",
		goalDesc: "",
		goalMetric: "minutes",
		goalTarget: 0.0,
		frequency: "Never",
		startDate: formatDate(new Date(), "db"),
		endDate: formatDate(new Date(), "db"),
	});

	const onChange = (name: string, value: string | number) => {
		setNewGoal({
			...newGoal,
			[name]: value,
		});
	};
	const onSelect = (name: string, value: string | Date) => {
		setNewGoal({
			...newGoal,
			[name]: value,
		});
	};

	const selectGoalType = (type: GoalType) => {
		setNewGoal({
			...newGoal,
			goalType: type.name,
			goalMetric: type.unit,
		});
	};

	const saveGoal = () => {
		// do stuff

		onClose();
	};

	// Steps for multi-step modal for adding a new goal
	const steps: StepItem[] = [
		// GOAL TYPES
		{
			id: 1,
			title: "Choose a workout goal",
			content: (
				<GoalTypesStep
					goalTypes={goalTypes}
					onSelect={selectGoalType}
					selectedType={newGoal.goalType}
				/>
			),
			next: 2,
			validate: () => !!newGoal.goalType,
		},
		// GOAL TARGETS
		{
			id: 2,
			title: "Set your goal target(s)",
			content: (
				<GoalTargetStep
					values={newGoal}
					onChange={onChange}
					onSelect={onSelect}
				/>
			),
			prev: 1,
			next: 3,
			validate: () => !!newGoal.goalTarget,
		},
		// GOAL NAME & DESC
		{
			id: 3,
			title: "What's this goal called?",
			content: (
				<AboutGoalStep
					values={newGoal}
					onChange={onChange}
					onSelect={onSelect}
				/>
			),
			prev: 2,
			next: 4,
			validate: () => !!newGoal.goalName,
		},
		// GOAL SCHEDULE & FREQUENCY
		{
			id: 4,
			title: "When should this goal occur?",
			content: (
				<GoalScheduleStep
					values={newGoal}
					onChange={onChange}
					onSelect={onSelect}
				/>
			),
			prev: 3,
			next: 5,
			validate: () => !!newGoal.frequency,
		},

		// SUMMARY
		{
			id: 5,
			title: "Goal Summary",
			content: (
				<GoalSummaryStep
					values={newGoal}
					onChange={onChange}
					onSelect={onSelect}
				/>
			),
			prev: 4,
		},
	];

	return (
		<>
			<MultiStepModal steps={steps} onClose={onClose} onSave={saveGoal} />
		</>
	);
};

export default AddGoal;

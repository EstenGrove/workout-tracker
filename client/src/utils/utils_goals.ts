import { RepeatType } from "./utils_recurring";

export interface GoalType {
	typeID: number;
	name: string;
	desc: string;
	unit: string;
	icon: string;
	isActive: boolean;
	createdDate: string;
}

export interface NewGoalValues {
	goalType: GoalType["name"];
	goalName: string;
	goalDesc: string;
	goalMetric: string; // minutes, steps, reps, workouts etc
	goalTarget: number;
	frequency: RepeatType;
	startDate: Date | string;
	endDate: Date | string;
}

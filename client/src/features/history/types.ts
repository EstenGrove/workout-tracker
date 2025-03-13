import { Effort } from "../../utils/utils_workouts";
import { Activity } from "../activity/types";

export interface WorkoutHistory {
	historyID: number;
	workoutID: number;
	activityType: Activity;
	workoutName: string;
	workoutDate: string;
	tagColor: string;
	targetMins: number;
	startTime: string;
	endTime: string;
	recordedEffort: Effort;
	recordedMins: number;
	recordedWeight: number;
	recordedSets: number;
	recordedReps: number;
	recordedSteps: number;
	recordedMiles: number;
	createdDate: string;
}

export interface WorkoutPlan {
	planID: number;
	planName: string;
	planMetric: number;
	planGoal: number;
	planWeight: number;
	planReps: number;
	planSets: number;
	planSteps: number;
	planMiles: number;
	planMins: number;
	isActive: boolean;
	createdDate: string;
}

export interface SelectedHistoryEntry {
	record: WorkoutHistory;
	workoutPlan: WorkoutPlan;
	planHistory: WorkoutHistory[];
}

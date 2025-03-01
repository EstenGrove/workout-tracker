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

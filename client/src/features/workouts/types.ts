import { ActiveTimer } from "../../hooks/useWorkoutTimer";
import { Activity } from "../activity/types";

export interface Workout {
	workoutID: number;
	planID: number;
	activityType: Activity;
	workoutName: string;
	workoutDesc: string;
	workoutMins: number;
	tagColor: string;
	createdDate: string;
}

export interface EndedWorkoutDetails {
	info: ActiveTimer; // startedAt, stoppedAt etc
	time: string; // 7:43 (eg 7m 43secs)
}

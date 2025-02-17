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

export interface UserWorkout {
	workoutID: number;
	planID: number;
	activityID: number;
	userID: string;
	activityType: Activity;
	workoutName: string;
	workoutDesc: string;
	workoutMins: number;
	tagColor: string;
	createdDate: string;
	categoryID: number;
	categoryName: string;
	categoryDesc: string;
}

export interface WorkoutCategory {
	categoryID: number;
	categoryName: string;
	categoryDesc: string;
	isActive: boolean;
	createdDate: Date | string;
}

export interface EndedWorkoutDetails {
	info: ActiveTimer; // startedAt, stoppedAt etc
	time: string; // 7:43 (eg 7m 43secs)
}

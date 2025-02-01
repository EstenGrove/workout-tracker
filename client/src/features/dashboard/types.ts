import { Activity } from "../activity/types";

export interface RecentWorkout {
	workoutID: number;
	activityType: Activity;
	workoutLength: number; // mins
	workoutDate: string;
}

export type RecentWorkoutsByType = Record<Activity, RecentWorkout[]>;

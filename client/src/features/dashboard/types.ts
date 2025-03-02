import { Activity } from "../activity/types";

export interface RecentWorkout {
	workoutID: number;
	activityType: Activity;
	workoutLength: number; // mins
	workoutDate: string;
}

export interface RecentMinsByDate {
	date: string;
	mins: number;
}

export interface RecentStepsByDate {
	date: string;
	steps: number;
}
export interface RecentCaloriesByDate {
	date: string;
	calories: number;
}

// Dashboard Summary
export interface DashboardActivity {
	recentMins: RecentMinsByDate[];
	recentSteps: number;
	recentCalories: number;
}

export type RecentWorkoutsByType = Record<Activity, RecentWorkout[]>;

import { Activity } from "../activity/types";
import { StreakDay } from "../workouts/types";

export interface RecentWorkout {
	historyID: number;
	workoutID: number;
	workoutName: string;
	activityType: Activity;
	workoutLength: number; // mins
	workoutDate: string;
	startTime: string;
	endTime: string;
	// optional???
	targetMins: number;
}

export interface RecentMinsByDate {
	date: string;
	mins: number;
}
export type WeeklyMinsByDate = RecentMinsByDate & {
	weekDay: string;
};

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
	recentMins: WeeklyMinsByDate[];
	recentSteps: number;
	recentCalories: number;
	recentWorkoutCount: number;
}

export type RecentWorkoutsByType = Record<Activity, RecentWorkout[]>;

export interface DashboardSummary {
	recentSteps: number; // steps for a given date
	recentCalories: number; // calories for given date
	recentWorkoutCount: number; // workouts for given date
	recentMins: WeeklyMinsByDate[]; // weekly streak basically, for bar chart
	recentWorkouts: RecentWorkout[];
	weeklyStreak: StreakDay[];
}

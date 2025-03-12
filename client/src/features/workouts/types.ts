import { ActiveTimer } from "../../hooks/useWorkoutTimer";
import { Effort } from "../../utils/utils_workouts";
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

export interface StreakDay {
	date: Date | string;
	mins: number;
	goal: number;
	weekDay: string;
}

export interface TotalCalories {
	totalCalories: number;
	startDate: string;
	endDate: string;
}
export interface TotalWorkouts {
	totalWorkouts: number;
	startDate: string;
	endDate: string;
}
export interface TotalMins {
	totalMins: number;
	startDate: string;
	endDate: string;
}
export interface WorkoutSummaryForDate {
	date: Date | string;
	totalMins: number;
	totalCalories: number;
	totalWorkouts: number;
}

export interface WorkoutSummaryResp {
	weeklyStreak: StreakDay[];
	totalMins: TotalMins;
	totalCalories: TotalCalories;
	totalWorkouts: TotalWorkouts;
}

export interface WorkoutSummary {
	totalMins: number;
	totalCalories: number;
	totalWorkouts: number;
	weeklyStreak: StreakDay[];
}

export interface WorkoutHistoryEntry {
	historyID: number;
	activityID: number;
	workoutID: number;
	planID: number;
	userID: string;
	workoutDate: string;
	startTime: string;
	endTime: string;
	effort: Effort;
	recordedMins: number;
	recordedWeight: number;
	recordedSets: number;
	recordedReps: number;
	recordedSteps: number;
	recordedMiles: number;
	createdDate: string;
}

export interface SelectedWorkout {
	record: Workout;
}

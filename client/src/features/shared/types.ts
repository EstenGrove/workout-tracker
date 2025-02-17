import { Workout } from "../workouts/types";

export interface ActivityTypeRecord {
	activityID: number;
	name: string;
	desc: string;
	isActive: boolean;
	createdDate: string;
}

// 4: [...workoutsForThisCategory], 6: [...workoutsForThisCategory]
export type WorkoutsByCategoryID = Record<number, Workout[]>;

export type WorkoutWithCategoryID = Workout & {
	categoryID: number;
	categoryName: string;
};

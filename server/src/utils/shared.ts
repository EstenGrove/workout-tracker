import type {
	ActivityTypeClient,
	ActivityTypeDB,
} from "../services/ActivityTypesService.ts";
import { sharedService } from "../services/index.ts";
import type {
	WorkoutByCategoryClient,
	WorkoutByCategoryDB,
	WorkoutCategoryClient,
	WorkoutCategoryDB,
} from "../services/types.ts";

export interface SharedDataDB {
	activityTypes: ActivityTypeDB[];
	categories: WorkoutCategoryDB[];
	workoutsByCategory: WorkoutByCategoryDB[];
}
export interface SharedDataClient {
	activityTypes: ActivityTypeClient[];
	categories: WorkoutCategoryClient[];
	workoutsByCategory: WorkoutByCategoryClient[];
}

const getSharedData = async (userID: string) => {
	try {
		const [activityTypes, categories, workoutsByCategory] = await Promise.all([
			sharedService.getActivityTypes(),
			sharedService.getWorkoutCategories(),
			sharedService.getWorkoutsByCategory(userID),
		]);

		return {
			activityTypes,
			categories,
			workoutsByCategory,
		};
	} catch (error) {
		return error;
	}
};

export { getSharedData };

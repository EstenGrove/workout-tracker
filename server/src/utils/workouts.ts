import { workoutService } from "../services/index.ts";
import type { Activity, WorkoutHistoryDB } from "../services/types.ts";
import type { LogWorkoutVals } from "../services/WorkoutService.ts";

const logWorkout = async (
	userID: string,
	values: LogWorkoutVals
): Promise<WorkoutHistoryDB | unknown> => {
	const { activityType } = values;

	switch (activityType) {
		case "Walk": {
			return (await workoutService.logWorkoutWalkType(
				userID,
				values
			)) as WorkoutHistoryDB;
		}
		case "Stretch": {
			return (await workoutService.logWorkoutStretchType(
				userID,
				values
			)) as WorkoutHistoryDB;
		}
		case "Strength": {
			return (await workoutService.logWorkoutStrengthType(
				userID,
				values
			)) as WorkoutHistoryDB;
			break;
		}
		case "Cardio": {
			return (await workoutService.logWorkoutCardioType(
				userID,
				values
			)) as WorkoutHistoryDB;
		}
		case "Other": {
			return (await workoutService.logWorkoutOtherType(
				userID,
				values
			)) as WorkoutHistoryDB;
		}

		default:
			throw new Error("Invalid activity type: " + activityType);
	}
};

export { logWorkout };

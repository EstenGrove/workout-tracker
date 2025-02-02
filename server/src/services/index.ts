import db from "../db/db.ts";
import { ActivityTypesService } from "./ActivityTypesService.ts";
import { UserService } from "./UserService.ts";
import { WorkoutService } from "./WorkoutService.ts";

const userService = new UserService(db);
const workoutService = new WorkoutService(db);
const activityTypesService = new ActivityTypesService(db);

const services = {
	user: userService,
	activityTypes: activityTypesService,
	workouts: workoutService,
};

export {
	// Grouped global services
	services,
	// Individual service classes
	userService,
	workoutService,
	activityTypesService,
};

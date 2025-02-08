import db from "../db/db.ts";
import { ActivityTypesService } from "./ActivityTypesService.ts";
import { MedicationsService } from "./MedicationsService.ts";
import { UserService } from "./UserService.ts";
import { WorkoutService } from "./WorkoutService.ts";

const userService = new UserService(db);
const workoutService = new WorkoutService(db);
const medicationsService = new MedicationsService(db);
const activityTypesService = new ActivityTypesService(db);

const services = {
	user: userService,
	activityTypes: activityTypesService,
	workouts: workoutService,
	medications: medicationsService,
};

export {
	// Grouped global services
	services,
	// Individual service classes
	userService,
	workoutService,
	medicationsService,
	activityTypesService,
};

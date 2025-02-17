import db from "../db/db.ts";
import { UserService } from "./UserService.ts";
import { SharedService } from "./SharedService.ts";
import { WorkoutService } from "./WorkoutService.ts";
import { MedicationsService } from "./MedicationsService.ts";
import { ActivityTypesService } from "./ActivityTypesService.ts";

const userService = new UserService(db);
const sharedService = new SharedService(db);
const workoutService = new WorkoutService(db);
const medicationsService = new MedicationsService(db);
const activityTypesService = new ActivityTypesService(db);

const services = {
	user: userService,
	activityTypes: activityTypesService,
	workouts: workoutService,
	medications: medicationsService,
	shared: sharedService,
};

export {
	// Grouped global services
	services,
	// Individual service classes
	userService,
	sharedService,
	workoutService,
	medicationsService,
	activityTypesService,
};

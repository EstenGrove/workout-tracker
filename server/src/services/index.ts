import db from "../db/db.ts";
import { UserService } from "./UserService.ts";
import { SharedService } from "./SharedService.ts";
import { HistoryService } from "./HistoryService.ts";
import { WorkoutService } from "./WorkoutService.ts";
import { MedicationsService } from "./MedicationsService.ts";
import { ActivityTypesService } from "./ActivityTypesService.ts";

const userService = new UserService(db);
const sharedService = new SharedService(db);
const workoutService = new WorkoutService(db);
const historyService = new HistoryService(db);
const medicationsService = new MedicationsService(db);
const activityTypesService = new ActivityTypesService(db);

const services = {
	user: userService,
	shared: sharedService,
	history: historyService,
	workouts: workoutService,
	medications: medicationsService,
	activityTypes: activityTypesService,
};

export {
	// Grouped global services
	services,
	// Individual service classes
	userService,
	sharedService,
	workoutService,
	historyService,
	medicationsService,
	activityTypesService,
};

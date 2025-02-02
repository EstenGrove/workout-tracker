import db from "../db/db.ts";
import { ActivityTypesService } from "./ActivityTypesService.ts";

const activityTypesService = new ActivityTypesService(db);

const services = {
	activityTypes: activityTypesService,
};

export {
	// Grouped global services
	services,
	// Individual service classes
	activityTypesService,
};

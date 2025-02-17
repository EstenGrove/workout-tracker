import userRoutes from "./userRoutes.ts";
import workoutRoutes from "./workoutRoutes.ts";
import medRoutes from "./medRoutes.ts";
import sharedRoutes from "./sharedRoutes.ts";

const allRoutes = {
	meds: medRoutes,
	user: userRoutes,
	shared: sharedRoutes,
	workouts: workoutRoutes,
};

export { allRoutes };

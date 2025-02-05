import userRoutes from "./userRoutes.ts";
import workoutRoutes from "./workoutRoutes.ts";
import medRoutes from "./medRoutes.ts";

const allRoutes = {
	meds: medRoutes,
	user: userRoutes,
	workouts: workoutRoutes,
};

export { allRoutes };

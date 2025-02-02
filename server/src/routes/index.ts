import userRoutes from "./userRoutes.ts";
import workoutRoutes from "./workoutRoutes.ts";

const allRoutes = {
	user: userRoutes,
	workouts: workoutRoutes,
};

export { allRoutes };

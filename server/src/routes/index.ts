import userRoutes from "./userRoutes.ts";
import workoutRoutes from "./workoutRoutes.ts";
import medRoutes from "./medRoutes.ts";
import sharedRoutes from "./sharedRoutes.ts";
import historyRoutes from "./historyRoutes.ts";
import dashboardRoutes from "./dashboardRoutes.ts";

const allRoutes = {
	meds: medRoutes,
	user: userRoutes,
	shared: sharedRoutes,
	history: historyRoutes,
	workouts: workoutRoutes,
	dashboard: dashboardRoutes,
};

export { allRoutes };

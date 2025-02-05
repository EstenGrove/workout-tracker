import type {
	MedLogEntryClient,
	MedLogEntryDB,
} from "../services/MedicationsService.ts";
import type { UserClient, UserDB } from "../services/UserService.ts";
import type { WorkoutClient, WorkoutDB } from "../services/WorkoutService.ts";

const normalizeUser = (user: UserDB): UserClient => {
	const clientUser: UserClient = {
		userID: user.user_id,
		username: user.username,
		password: user.password,
		firstName: user.first_name,
		lastName: user.last_name,
		isActive: user.is_active,
		createdDate: user.created_date,
		lastLoginDate: user.last_login_date,
		userAvatar: user.user_avatar,
	};

	return clientUser;
};

const normalizeWorkout = (workout: WorkoutDB): WorkoutClient => {
	const clientWorkout: WorkoutClient = {
		workoutID: workout.workout_id,
		activityID: workout.activity_id,
		planID: workout.plan_id,
		userID: workout.user_id,
		workoutName: workout.workout_name,
		workoutDesc: workout.workout_desc,
		workoutMins: workout.workout_mins,
		tagColor: workout.tag_color,
		isActive: workout.is_active,
		createdDate: workout.created_date,
	};

	return clientWorkout;
};

const normalizeWorkouts = (workouts: WorkoutDB[]): WorkoutClient[] => {
	if (!workouts || !workouts.length) return [];

	const clientWorkouts = workouts.map((record) => normalizeWorkout(record));

	return clientWorkouts;
};

const normalizeMedLog = (log: MedLogEntryDB): MedLogEntryClient => {
	const clientLog: MedLogEntryClient = {
		logID: log.log_id,
		scheduleID: log.schedule_id,
		loggedAt: log.logged_at,
		dose: log.dose,
		notes: log.notes,
		createdDate: log.created_date,
	};
	return clientLog;
};

export { normalizeUser, normalizeWorkout, normalizeWorkouts, normalizeMedLog };

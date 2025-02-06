import type {
	DaysLeftClient,
	DaysLeftDB,
	MedInfoClient,
	MedInfoDB,
	MedLogEntryClient,
	MedLogEntryDB,
	PillSummaryClient,
	PillSummaryDB,
	TakenPillsByRangeClient,
	TakenPillsByRangeDB,
} from "../services/types.ts";
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
const normalizePillSummary = (summary: PillSummaryDB): PillSummaryClient => {
	const clientSummary: PillSummaryClient = {
		scheduleID: summary.schedule_id,
		totalPills: summary.total_pills,
		pillsRemaining: summary.total_pills_remaining,
		pillsTaken: summary.total_pills_taken,
		pillsTakenToday: summary.total_pills_taken_today,
		daysLeft: summary.days_left,
	};

	return clientSummary;
};
const normalizeDaysLeft = (daysLeft: DaysLeftDB): DaysLeftClient => {
	const client: DaysLeftClient = {
		scheduleID: daysLeft.schedule_id,
		startDate: daysLeft.start_date,
		endDate: daysLeft.end_date,
		daysLeft: daysLeft.days_left,
	};

	return client;
};
// Normalizes total pills taken within a date range
const normalizePillsTaken = (
	row: TakenPillsByRangeDB
): TakenPillsByRangeClient => {
	const client: TakenPillsByRangeClient = {
		pillsTaken: row.pills_taken,
		startDate: row.start_date,
		endDate: row.end_date,
	};

	return client;
};
// User Meds (custom)
const normalizeMedInfo = (med: MedInfoDB) => {
	const clientMed: MedInfoClient = {
		userID: med.user_id,
		medID: med.medication_id,
		medName: med.med_name,
		dosage: med.dosage,
		quantity: med.quantity,
		refillDate: med.refill_date,
		refillInterval: med.refill_interval,
		isActive: med.is_active,
		createdDate: med.created_date,
		scheduleID: med.schedule_id,
		scheduleStart: med.schedule_start,
		scheduleEnd: med.schedule_end,
		dosageDesc: med.dosage_desc,
		scheduleDose: med.schedule_dose,
		scheduleFrequency: med.schedule_frequency,
		scheduleAmount: med.schedule_amount,
	};

	return clientMed;
};
export {
	normalizeUser,
	normalizeWorkout,
	normalizeWorkouts,
	normalizeMedLog,
	normalizePillSummary,
	normalizePillsTaken,
	normalizeDaysLeft,
	normalizeMedInfo,
};

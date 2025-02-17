import type {
	ActivityTypeClient,
	ActivityTypeDB,
} from "../services/ActivityTypesService.ts";
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
	WorkoutByCategoryClient,
	WorkoutByCategoryDB,
	WorkoutCategoryClient,
	WorkoutCategoryDB,
	WorkoutHistoryClient,
	WorkoutHistoryDB,
} from "../services/types.ts";
import type { UserClient, UserDB } from "../services/UserService.ts";
import type { WorkoutClient, WorkoutDB } from "../services/WorkoutService.ts";
import type { SharedDataDB } from "./shared.ts";

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
// Normalizes a single workout history record
const normalizeHistory = (history: WorkoutHistoryDB): WorkoutHistoryClient => {
	const client: WorkoutHistoryClient = {
		userID: history.user_id,
		historyID: history.history_id,
		activityID: history.activity_id,
		workoutID: history.workout_id,
		planID: history.plan_id,
		workoutDate: history.workout_date,
		startTime: history.start_time,
		endTime: history.end_time,
		recordedEffort: history.recorded_effort,
		recordedMins: history.recorded_mins,
		recordedWeight: history.recorded_weight,
		recordedReps: history.recorded_reps,
		recordedSteps: history.recorded_steps,
		recordedMiles: history.recorded_miles,
		createdDate: history.created_date,
	};
	return client;
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

const normalizeActivityType = (type: ActivityTypeDB): ActivityTypeClient => {
	const client: ActivityTypeClient = {
		activityID: type.activity_id,
		activityType: type.activity_type,
		activityDesc: type.activity_desc,
		activityKey: type.activity_key,
		isActive: type?.is_active ?? true,
		createdDate: type?.created_date ?? "",
	};
	return client;
};

const normalizeWorkoutCategory = (
	category: WorkoutCategoryDB
): WorkoutCategoryClient => {
	const client: WorkoutCategoryClient = {
		categoryID: category.category_id,
		categoryName: category.category_name,
		categoryDesc: category.category_desc,
		isActive: category.is_active,
		createdDate: category.created_date,
	};
	return client;
};

const normalizeWorkoutByCategory = (byCategory: WorkoutByCategoryDB) => {
	const client: WorkoutByCategoryClient = {
		workoutID: byCategory.workout_id,
		activityID: byCategory.activity_id,
		activityType: byCategory.activity_type,
		planID: byCategory.plan_id,
		userID: byCategory.user_id,
		workoutName: byCategory.workout_name,
		workoutDesc: byCategory.workout_desc,
		workoutMins: byCategory.workout_mins,
		tagColor: byCategory.tag_color,
		categoryID: byCategory.category_id,
		categoryDesc: byCategory.category_desc,
		categoryName: byCategory.category_name,
	};

	return client;
};

const normalizeSharedData = (sharedData: SharedDataDB) => {
	const {
		activityTypes: types,
		workoutsByCategory: byCategory,
		categories: categoryList,
	} = sharedData;
	const activityTypes = types.map(normalizeActivityType);
	const workoutsByCategory = byCategory.map(normalizeWorkoutByCategory);
	const categories = categoryList.map(normalizeWorkoutCategory);

	return {
		activityTypes,
		workoutsByCategory,
		categories,
	};
};

export {
	normalizeUser,
	normalizeWorkout,
	normalizeWorkouts,
	normalizeMedLog,
	normalizeHistory,
	normalizePillSummary,
	normalizePillsTaken,
	normalizeDaysLeft,
	normalizeMedInfo,
	normalizeWorkoutCategory,
	normalizeWorkoutByCategory,
	normalizeActivityType,
	normalizeSharedData,
};

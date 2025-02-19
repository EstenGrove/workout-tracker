export type Activity =
	| "Walk"
	| "Strength"
	| "Stretch"
	| "Cardio"
	| "Timed"
	| "Other";

export interface PillSummaryDB {
	schedule_id: number;
	total_pills: number;
	total_pills_taken: number;
	total_pills_taken_today: number;
	total_pills_remaining: number;
	days_left: number;
}
export interface PillSummaryClient {
	scheduleID: number;
	totalPills: number;
	pillsRemaining: number;
	pillsTaken: number;
	pillsTakenToday: number;
	daysLeft: number;
}

export interface MedLogEntryDB {
	log_id: number;
	schedule_id: number;
	logged_at: string;
	dose: number;
	notes: string;
	created_date: string;
}
export interface MedLogEntryClient {
	logID: number;
	scheduleID: number;
	loggedAt: string;
	dose: number;
	notes: string;
	createdDate: string;
}

export interface MedicationDB {
	user_id: string;
	medication_id: number;
	med_name: string;
	dosage: string;
	quantity: number;
	refill_date: string;
	refill_interval: number;
	created_date: string;
	is_active: boolean;
}
export interface MedicationClient {
	userID: string;
	medicationID: number;
	medName: string;
	dosage: string;
	quantity: number;
	refillDate: string;
	refillInterval: number;
	createdDate: string;
	isActive: boolean;
}

// Total taken for date range
export interface TakenPillsByRangeDB {
	pills_taken: number;
	start_date: string;
	end_date: string;
}
export interface TakenPillsByRangeClient {
	pillsTaken: number;
	startDate: string;
	endDate: string;
}

// Total taken for schedule
export interface TotalPillsTakenDB {
	total_taken: number;
	schedule_id: number;
}
export interface TotalPillsTakenClient {
	pillsTaken: number;
	scheduleID: number;
}

export interface DaysLeftDB {
	schedule_id: number;
	start_date: string;
	end_date: string;
	days_left: number;
}
export interface DaysLeftClient {
	scheduleID: number;
	startDate: string;
	endDate: string;
	daysLeft: number;
}

// Fetching user medications returns this
export interface MedInfoDB {
	user_id: string;
	medication_id: number;
	med_name: string;
	dosage: string;
	quantity: number;
	refill_date: Date | string;
	refill_interval: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | string;
	is_active: boolean;
	created_date: Date | string;
	schedule_id: number;
	schedule_start: Date | string;
	schedule_end: Date | string;
	dosage_desc: string;
	schedule_dose: number;
	schedule_frequency: string;
	schedule_amount: number;
}
// Fetching user medications returns this
export interface MedInfoClient {
	userID: string;
	medID: number;
	medName: string;
	dosage: string;
	quantity: number;
	refillDate: Date | string;
	refillInterval: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | string;
	isActive: boolean;
	createdDate: Date | string;
	scheduleID: number;
	scheduleStart: Date | string;
	scheduleEnd: Date | string;
	dosageDesc: string;
	scheduleDose: number;
	scheduleFrequency: string;
	scheduleAmount: number;
}

export interface WorkoutHistoryDB {
	history_id: number;
	activity_id: number;
	workout_id: number;
	plan_id: number;
	user_id: string;
	workout_date: string;
	start_time: string;
	end_time: string;
	recorded_effort: string;
	recorded_mins: number;
	recorded_weight: number;
	recorded_reps: number;
	recorded_steps: number;
	recorded_miles: number;
	created_date: string;
}
export interface WorkoutHistoryClient {
	historyID: number;
	activityID: number;
	workoutID: number;
	planID: number;
	userID: string;
	workoutDate: string;
	startTime: string;
	endTime: string;
	recordedEffort: string;
	recordedMins: number;
	recordedWeight: number;
	recordedReps: number;
	recordedSteps: number;
	recordedMiles: number;
	createdDate: string;
}

export interface DateRange {
	startDate: Date | string;
	endDate: Date | string;
}

export interface MedScheduleDB {
	user_id: string;
	med_id: number;
	schedule_id: number;
	start_date: string;
	end_date: string;
	dosage_desc: string;
	dosage_per_interval: number;
	frequency: string;
	quantity: number;
	is_active: boolean;
	created_date: string;
}
export interface MedScheduleClient {
	userID: string;
	medID: number;
	scheduleID: number;
	startDate: string;
	endDate: string;
	dosageDesc: string;
	dosagePerInterval: number;
	frequency: string;
	quantity: number;
	isActive: boolean;
	createdDate: string;
}

export interface WorkoutCategoryDB {
	category_id: number;
	category_name: string;
	category_desc: string;
	is_active: boolean;
	created_date: string;
}
export interface WorkoutCategoryClient {
	categoryID: number;
	categoryName: string;
	categoryDesc: string;
	isActive: boolean;
	createdDate: string;
}

export interface WorkoutByCategoryDB {
	workout_id: number;
	activity_id: number;
	activity_type: Activity;
	plan_id: number;
	user_id: string;
	workout_name: string;
	workout_desc: string;
	workout_mins: number;
	tag_color: string | null;
	category_id: number;
	category_name: string;
	category_desc: string;
}
export interface WorkoutByCategoryClient {
	workoutID: number;
	activityID: number;
	activityType: Activity;
	planID: number;
	userID: string;
	workoutName: string;
	workoutDesc: string;
	workoutMins: number;
	tagColor: string | null;
	categoryID: number;
	categoryName: string;
	categoryDesc: string;
}

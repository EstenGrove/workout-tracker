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

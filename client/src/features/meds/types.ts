export interface MedLogEntry {
	logID: number;
	scheduleID: number;
	loggedAt: Date | string;
	dose: number;
	notes: string;
	pillSizeInMg: number;
}

export interface PillSummary {
	scheduleID?: number;
	daysLeft: number;
	totalPills: number;
	pillsTaken: number;
	pillsRemaining: number;
	pillsTakenToday: number;
}

export interface Medication {
	medID: number;
	scheduleID: number;
	scheduleStart: Date | string;
	scheduleEnd: Date | string;
	medName: string;
	dosage: string | number;
	quantity: number;
	refillDate: Date | string;
	refillInterval: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | string;
	isActive: boolean;
	createdDate: Date | string;
}

// Full Schedule record
export interface MedicationSchedule {
	userID: string;
	medID: number;
	scheduleID: number;
	startDate: Date | string;
	endDate: Date | string;
	dosageDesc: string;
	scheduleDose: number;
	scheduleFrequency: string;
	scheduleQuantity: number;
	isActive: boolean;
	createdDate: Date | string;
}

// DaysLeft object
export interface MedScheduleSummary {
	scheduleID: number;
	startDate: Date | string;
	endDate: Date | string;
	daysLeft: number;
	createdDate: Date | string;
}

export interface SelectedMed {
	med: Medication;
	logs: MedLogEntry[];
	schedule: MedScheduleSummary;
}

export interface SummaryForDate {
	date: string;
	summaries: PillSummary[];
	logs: MedLogEntry[];
}

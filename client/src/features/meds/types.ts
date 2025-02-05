export interface MedLogEntry {
	logID: number;
	scheduleID: number;
	loggedAt: Date | string;
	dose: number;
	notes: string;
	pillSizeInMg: number;
}

export interface MedLogSummary {
	totalPills: number;
	pillsTaken: number;
	pillsRemaining: number;
	pillsTakenToday: number;
}

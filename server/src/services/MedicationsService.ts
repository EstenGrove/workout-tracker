import type { Pool } from "pg";
import type { TQueryRow } from "../db/db.ts";
import type {
	DateRange,
	DaysLeftDB,
	MedInfoDB,
	MedLogEntryDB,
	MedScheduleDB,
	PillSummaryDB,
	TakenPillsByRangeDB,
	TotalPillsTakenDB,
} from "./types.ts";

export interface LogMedBody {
	userID: string;
	medID: number;
	scheduleID: number;
	amountTaken: number;
	action: "Taken" | "Skipped";
	loggedAt: Date | string;
}

interface TakenPillsParams {
	scheduleID: number;
	startDate: Date | string;
	endDate: Date | string;
}

interface PillSummaryParams {
	scheduleID: number;
	targetDate: Date | string;
}

interface DaysLeftParams {
	scheduleID: number;
	userID: string;
}

export interface LogSettingParams {
	startDate: string;
	endDate: string;
	medID: number;
}

class MedicationsService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getActiveScheduleByDate(userID: string, medID: number, date: string) {
		try {
			const query = `SELECT * FROM get_active_schedule_by_med(
				$1,
				$2,
				$3
			)`;
			const result = await this.#db.query(query, [userID, medID, date]);
			const row = result?.rows?.[0] as MedScheduleDB;
			return row as MedScheduleDB;
		} catch (error) {
			return error;
		}
	}

	async logMedication(values: LogMedBody) {
		// action: 'Taken' | 'Skipped'
		const { userID, medID, scheduleID, amountTaken, action, loggedAt } = values;
		try {
			const query = `SELECT * FROM log_medication(
        $1,
        $2,
        $3,
        $4,
        $5,
				$6
      )`;
			const results = await this.#db.query(query, [
				userID,
				medID,
				scheduleID,
				loggedAt,
				amountTaken,
				action,
			]);
			const row = results?.rows?.[0] as TQueryRow<MedLogEntryDB>;
			return row as MedLogEntryDB;
		} catch (error) {
			return error;
		}
	}

	async getUserMeds(userID: string): Promise<MedInfoDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_user_medications(
				$1
			)`;
			const results = await this.#db.query(query, [userID]);
			const rows = results?.rows as TQueryRow<MedInfoDB[]>;

			return rows as MedInfoDB[];
		} catch (error) {
			return error;
		}
	}

	async getDaysLeft(
		userID: string,
		scheduleID: number
	): Promise<DaysLeftDB | unknown> {
		try {
			const query = `SELECT * FROM get_days_left_in_schedule(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, scheduleID]);
			const row = results?.rows?.[0] as DaysLeftDB;

			return row;
		} catch (error) {
			return error;
		}
	}

	async getAllPillSummariesByDate(
		userID: string,
		targetDate: string
	): Promise<PillSummaryDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_all_pill_summaries(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, targetDate]);
			const rows = results?.rows as PillSummaryDB[];

			return rows as PillSummaryDB[];
		} catch (error) {
			return error;
		}
	}

	// Calculates various totals for a given schedule & date
	async getPillSummaryByDate(
		userID: string,
		params: PillSummaryParams
	): Promise<PillSummaryDB | unknown> {
		const { scheduleID, targetDate } = params;

		try {
			const query = `SELECT * FROM get_pill_summary_by_date(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [
				userID,
				scheduleID,
				targetDate,
			]);
			const row = results?.rows?.[0] as PillSummaryDB;

			return row;
		} catch (error) {
			return error;
		}
	}

	// Get total # of pills taken within a date range
	async getTakenPillsByRange(
		userID: string,
		params: TakenPillsParams
	): Promise<TakenPillsByRangeDB | unknown> {
		const { scheduleID, startDate, endDate } = params;
		try {
			const query = `SELECT * FROM get_taken_pills_by_range(
				$1,
				$2,
				$3,
				$4
			)`;
			const results = await this.#db.query(query, [
				userID,
				scheduleID,
				startDate,
				endDate,
			]);
			const row = results?.rows?.[0] as {
				pills_taken: number;
				start_date: string;
				end_date: string;
			};

			return row;
		} catch (error) {
			return error;
		}
	}

	async getAllLogsForDate(
		userID: string,
		targetDate: string
	): Promise<MedLogEntryDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_all_logged_meds_for_date(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, targetDate]);
			const rows = results?.rows as MedLogEntryDB[];
			return rows;
		} catch (error) {
			return error;
		}
	}

	async getLogsForMedByRange(userID: string, params: LogSettingParams) {
		const { medID, startDate, endDate } = params;
		try {
			const query = `SELECT * FROM get_logged_meds_for_range(
				$1,
				$2,
				$3,
				$4
			)`;
			const results = await this.#db.query(query, [
				userID,
				medID,
				startDate,
				endDate,
			]);
			const rows = results?.rows;
			return rows;
		} catch (error) {
			return error;
		}
	}

	// Get all logs for a given date
	async getLogsForMedByDate(
		userID: string,
		scheduleID: number,
		targetDate: Date | string = new Date()
	): Promise<MedLogEntryDB[] | unknown> {
		const date = targetDate.toString();

		try {
			const query = `SELECT * FROM get_logged_meds_for_date(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [userID, scheduleID, date]);
			const rows = results?.rows as MedLogEntryDB[];

			return rows;
		} catch (error) {
			return error;
		}
	}

	// Gets all logs for a given schedule
	async getTotalPillsTaken(
		userID: string,
		scheduleID: number
	): Promise<TotalPillsTakenDB | unknown> {
		try {
			const query = `SELECT * FROM get_total_pills_taken_in_schedule(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, scheduleID]);
			const row = results?.rows?.[0] as TotalPillsTakenDB;

			return row;
		} catch (error) {
			return error;
		}
	}

	async getMedicationByID(medID: number) {
		try {
			const query = `SELECT * FROM user_medications WHERE medication_id = $1`;
			const results = await this.#db.query(query, [medID]);
			const row = results?.rows?.[0];

			return row;
		} catch (error) {
			return error;
		}
	}
}

export { MedicationsService };

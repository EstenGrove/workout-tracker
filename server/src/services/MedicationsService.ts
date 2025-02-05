import type { Pool } from "pg";
import type { TQueryRow } from "../db/db.ts";

export interface LogMedBody {
	userID: string;
	medID: number;
	amountTaken: number;
	action: "Taken" | "Skipped";
	loggedAt: Date | string;
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

interface TakenPillsParams {
	scheduleID: number;
	startDate: Date | string;
	endDate: Date | string;
}

class MedicationsService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async logMedication(values: LogMedBody) {
		// action: 'Taken' | 'Skipped'
		const { userID, medID, amountTaken, action, loggedAt } = values;
		try {
			const query = `SELECT * FROM log_medication(
        $1,
        $2,
        $3,
        $4,
        $5
      )`;
			const results = await this.#db.query(query, [
				userID,
				medID,
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

	// Get total # of pills taken within a date range
	async getTakenPillsByRange(userID: string, params: TakenPillsParams) {
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

	// Get all logs for a given date
	async getLoggedMedsForDate(
		userID: string,
		scheduleID: number,
		targetDate: Date | string = new Date()
	) {
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
	async getTotalPillsTaken(userID: string, scheduleID: number) {
		try {
			const query = `SELECT * FROM get_total_pills_taken_in_schedule(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, scheduleID]);
			const row = results?.rows?.[0] as {
				total_taken: number;
				schedule_id: number;
			};

			return row;
		} catch (error) {
			return error;
		}
	}
}

export { MedicationsService };

import type { Pool } from "pg";
import type { WorkoutHistoryDB } from "./types.ts";

class HistoryService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}
	async getHistoryByDate(userID: string, targetDate: string) {
		try {
			const query = `SELECT * FROM get_workout_history_by_date(
        $1,
        $2
      )`;
			const results = await this.#db.query(query, [userID, targetDate]);
			const rows = results?.rows as WorkoutHistoryDB[];

			return rows as WorkoutHistoryDB[];
		} catch (error) {
			return error;
		}
	}
	async getHistoryByRange(
		userID: string,
		range: { startDate: string; endDate: string }
	) {
		const { startDate, endDate } = range;
		try {
			const query = `SELECT * FROM get_workout_history_by_range(
        $1,
        $2,
				$3
      )`;
			const results = await this.#db.query(query, [userID, startDate, endDate]);
			const rows = results?.rows as WorkoutHistoryDB[];

			return rows as WorkoutHistoryDB[];
		} catch (error) {
			return error;
		}
	}
}

export { HistoryService };

import type { Pool } from "pg";
import type {
	DashboardSummaryDB,
	RecentWorkoutCountDB,
	StreakDayDB,
	TotalCaloriesDB,
	TotalMinsDB,
	TotalStepsDB,
	WorkoutHistoryDB,
} from "./types.ts";

export type DashboardSummaryResp = Promise<DashboardSummaryDB | unknown>;

class DashboardService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getDashboardSummary(
		userID: string,
		targetDate: string
	): DashboardSummaryResp {
		try {
			const query = `SELECT * FROM get_dashboard_summary_for_date(
        $1,
        $2
      ) as summary`;
			const results = await this.#db.query(query, [userID, targetDate]);
			// const rows = results?.rows?.[0]?.get_dashboard_summary_for_date;
			const rows = results?.rows?.[0]?.summary;
			console.log("rows", rows);
			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { DashboardService };

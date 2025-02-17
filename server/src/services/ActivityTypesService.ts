import type { Pool, QueryResult } from "pg";
import type { TQueryRow } from "../db/db.ts";

export interface ActivityTypeDB {
	activity_id: number;
	activity_type: string;
	activity_desc: string;
	activity_key: string;
	is_active: boolean;
	created_date: string;
}
export interface ActivityTypeClient {
	activityID: number;
	activityType: string;
	activityDesc: string;
	activityKey: string;
	isActive: boolean;
	createdDate: string;
}

class ActivityTypesService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getActivityTypes(
		isActive: boolean = true
	): Promise<ActivityTypeDB[] | unknown> {
		try {
			const query = `SELECT * FROM activity_types WHERE is_active = $1`;
			const results = (await this.#db.query(query, [isActive])) as QueryResult;
			const rows = results?.rows as TQueryRow<ActivityTypeDB>[];

			return rows as ActivityTypeDB[];
		} catch (error) {
			return error;
		}
	}
}

export { ActivityTypesService };

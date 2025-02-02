import type { Pool } from "pg";
import type { TQueryRow } from "../db/db.ts";

export interface WorkoutDB {
	workout_id: number;
	activity_id: number;
	plan_id: number;
	user_id: string;
	workout_name: string;
	workout_desc: string;
	workout_mins: number;
	tag_color: string | null;
	is_active: boolean;
	created_date: string;
}
export interface WorkoutClient {
	workoutID: number;
	activityID: number;
	planID: number;
	userID: string;
	workoutName: string;
	workoutDesc: string;
	workoutMins: number;
	tagColor: string | null;
	isActive: boolean;
	createdDate: string;
}

class WorkoutService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getOpenWorkouts(userID: string, isActive: boolean = true) {
		try {
			const query = `SELECT * FROM get_open_workouts($1, $2)`;
			const results = await this.#db.query(query, [userID, isActive]);
			const rows = results?.rows as TQueryRow<WorkoutDB>[];

			return rows;
		} catch (error) {
			return error;
		}
	}

	// get all active workouts
	async getAllWorkouts() {
		try {
			const query = `SELECT * FROM workouts WHERE is_active = true`;
			const results = await this.#db.query(query);
			const rows = results?.rows as TQueryRow<WorkoutDB>[];

			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { WorkoutService };

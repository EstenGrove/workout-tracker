import type { Pool } from "pg";
import type { WorkoutByCategoryDB, WorkoutCategoryDB } from "./types.ts";
import type { ActivityTypeDB } from "./ActivityTypesService.ts";

class SharedService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getWorkoutCategories(
		isActive: boolean = true
	): Promise<WorkoutCategoryDB[] | unknown> {
		try {
			const query = `SELECT * FROM workout_categories WHERE is_active = $1`;
			const results = await this.#db.query(query, [isActive]);
			const rows = results?.rows;

			return rows;
		} catch (error) {
			return error;
		}
	}
	async getActivityTypes(
		isActive: boolean = true
	): Promise<ActivityTypeDB[] | unknown> {
		try {
			const query = `SELECT * FROM activity_types WHERE is_active = $1`;
			const results = await this.#db.query(query, [isActive]);
			const rows = results?.rows;

			return rows;
		} catch (error) {
			return error;
		}
	}
	async getWorkoutsByCategory(
		userID: string
	): Promise<WorkoutByCategoryDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_workouts_by_category($1)`;
			// const query = `SELECT * FROM get_workouts_list($1)`;
			const results = await this.#db.query(query, [userID]);
			const rows = results?.rows;

			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { SharedService };

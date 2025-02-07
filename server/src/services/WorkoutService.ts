import type { Pool } from "pg";
import type { TQueryRow } from "../db/db.ts";
import type { Activity, DateRange, WorkoutHistoryDB } from "./types.ts";

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

export interface LogWorkoutVals {
	userID: string;
	activityType: Activity;
	workoutID: number;
	workoutDate: string;
	startTime: string;
	endTime: string;
	recordedEffort: string;
	recordedMins: number;
	recordedWeight: number;
	recordedReps: number;
	recordedSets: number;
	recordedSteps: number;
	recordedMiles: number;
}

class WorkoutService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}
	async getRecentWorkoutsByDate(userID: string, params: DateRange) {
		try {
			const query = `SELECT * FROM get_recent_workouts(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [
				userID,
				params.startDate,
				params.endDate,
			]);
			const rows = results?.rows as WorkoutHistoryDB[];
			return rows;
		} catch (error) {
			return error;
		}
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
	async logWorkoutCardioType(userID: string, values: LogWorkoutVals) {
		const {
			workoutID,
			workoutDate,
			startTime,
			endTime,
			recordedEffort,
			recordedMins,
			recordedReps,
			recordedSets,
		} = values;
		try {
			const query = `SELECT * FROM save_history_for_cardio_workout(
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9
			)`;
			const params = [
				userID,
				workoutID,
				workoutDate,
				startTime,
				endTime,
				recordedEffort,
				recordedMins,
				recordedReps,
				recordedSets,
			];
			const results = await this.#db.query(query, params);
			const row = results?.rows?.[0];
			return row;
		} catch (error) {
			return error;
		}
	}
	async logWorkoutOtherType(userID: string, values: LogWorkoutVals) {
		const {
			workoutID,
			workoutDate,
			startTime,
			endTime,
			recordedEffort,
			recordedMins,
		} = values;
		try {
			const query = `SELECT * FROM save_history_for_other_workout(
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7
			)`;
			const params = [
				userID,
				workoutID,
				workoutDate,
				startTime,
				endTime,
				recordedEffort,
				recordedMins,
			];
			const results = await this.#db.query(query, params);
			const row = results?.rows?.[0];
			return row;
		} catch (error) {
			return error;
		}
	}
	async logWorkoutStrengthType(userID: string, values: LogWorkoutVals) {
		const {
			workoutID,
			workoutDate,
			startTime,
			endTime,
			recordedEffort,
			recordedMins,
			recordedWeight,
			recordedReps,
			recordedSets,
			// recordedSteps,
			// recordedMiles,
		} = values;
		try {
			const query = `SELECT * FROM save_history_for_strength_workout(
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9,
				$10
			)`;
			const params = [
				userID,
				workoutID,
				workoutDate,
				startTime,
				endTime,
				recordedEffort,
				recordedMins,
				recordedWeight,
				recordedReps,
				recordedSets,
			];
			const results = await this.#db.query(query, params);
			const row = results?.rows?.[0];
			return row;
		} catch (error) {
			return error;
		}
	}
	async logWorkoutWalkType(userID: string, values: LogWorkoutVals) {
		const {
			workoutID,
			workoutDate,
			startTime,
			endTime,
			recordedEffort,
			recordedMins,
			recordedSteps,
			recordedMiles,
		} = values;
		try {
			const query = `SELECT * FROM save_history_for_walk_workout(
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9,
				$10
			)`;
			const params = [
				userID,
				workoutID,
				workoutDate,
				startTime,
				endTime,
				recordedEffort,
				recordedMins,
				recordedSteps,
				recordedMiles,
			];
			const results = await this.#db.query(query, params);
			const row = results?.rows?.[0];
			return row;
		} catch (error) {
			return error;
		}
	}
	async logWorkoutStretchType(userID: string, values: LogWorkoutVals) {
		const {
			workoutID,
			workoutDate,
			startTime,
			endTime,
			recordedEffort,
			recordedMins,
			recordedSets,
			recordedReps,
		} = values;
		try {
			const query = `SELECT * FROM save_history_for_stretch_workout(
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9
			)`;
			const params = [
				userID,
				workoutID,
				workoutDate,
				startTime,
				endTime,
				recordedEffort,
				recordedMins,
				recordedReps,
				recordedSets,
			];
			const results = await this.#db.query(query, params);
			const row = results?.rows?.[0];
			return row;
		} catch (error) {
			return error;
		}
	}
}

export { WorkoutService };

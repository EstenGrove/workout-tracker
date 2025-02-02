import type { Pool, QueryResult } from "pg";

export interface UserDB {
	user_id: string;
	username: string;
	password: string;
	first_name: string;
	last_name: string;
	is_active: boolean;
	created_date: string;
	last_login_date: string | null;
}
export interface UserClient {
	userID: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	isActive: boolean;
	createdDate: string;
	lastLoginDate: string | null;
}

class UserService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getUserByID(userID: string): Promise<UserDB | unknown> {
		try {
			const query = `SELECT * FROM users WHERE user_id = $1 AND is_active = true`;
			const results = (await this.#db.query(query, [userID])) as QueryResult;
			const row = results?.rows?.[0] as UserDB;

			return row;
		} catch (error) {
			return error;
		}
	}
}

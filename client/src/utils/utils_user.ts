import { AsyncResponse } from "../features/types";
import { CurrentSession, CurrentUser } from "../features/user/types";
import { apiEndpoints, currentEnv } from "./utils_env";

export type UserResponse = {
	user: CurrentUser;
	session: CurrentSession | null;
};

const fetchUserByLogin = async (
	username: string,
	password: string
): AsyncResponse<UserResponse> => {
	const url = currentEnv.base + apiEndpoints.user.getByLogin;

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
		});
		const response = await request.json();

		return response as UserResponse;
	} catch (error) {
		return error;
	}
};
const fetchUserByID = async (userID: string): AsyncResponse<UserResponse> => {
	let url = currentEnv.base + apiEndpoints.user.getByLogin;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response as UserResponse;
	} catch (error) {
		return error;
	}
};

export { fetchUserByLogin, fetchUserByID };

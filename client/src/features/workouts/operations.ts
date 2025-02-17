import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserWorkouts } from "../../utils/utils_workouts";
import { AwaitedResponse } from "../types";
import { Workout } from "./types";

const getUserWorkouts = createAsyncThunk(
	"workouts/getUserWorkouts",
	async (userID: string) => {
		const response = (await fetchUserWorkouts(userID)) as AwaitedResponse<{
			userWorkouts: Workout[];
		}>;
		const data = response.Data;

		return data.userWorkouts as Workout[];
	}
);

export { getUserWorkouts };

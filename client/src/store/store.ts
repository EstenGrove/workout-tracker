import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "../features/user/userSlice";
import sharedReducer from "../features/shared/sharedSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import medicationsReducer from "../features/meds/medsSlice";
import workoutsReducer from "../features/workouts/workoutsSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		shared: sharedReducer,
		workouts: workoutsReducer,
		dashboard: dashboardReducer,
		medications: medicationsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// ALWAYS USE THIS VIA: const dispatch = useAppDispatch();
export const useAppDispatch: () => AppDispatch = useDispatch;

export { store };

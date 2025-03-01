import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "../features/user/userSlice";
import sharedReducer from "../features/shared/sharedSlice";
import medicationsReducer from "../features/meds/medsSlice";
import historyReducer from "../features/history/historySlice";
import settingsReducer from "../features/settings/settingsSlice";
import workoutsReducer from "../features/workouts/workoutsSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		shared: sharedReducer,
		history: historyReducer,
		settings: settingsReducer,
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

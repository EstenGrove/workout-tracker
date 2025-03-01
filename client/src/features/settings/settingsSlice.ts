import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

// 'Weekly': shows the weekly navigatino bar
// 'Range': shows a set of filters via a modal for more custom data filters
interface HistorySettings {
	// Which UI to show: WeeklyNav or Range Filter Types
	useHistoryType: "Weekly" | "Range";
}

interface SettingsSlice {
	workout: object;
	history: HistorySettings;
	user: object;
	medication: object;
}

const initialState: SettingsSlice = {
	workout: {},
	history: {
		useHistoryType: "Range",
	},
	user: {},
	medication: {},
};

const settingsSlice = createSlice({
	name: "settings",
	initialState: initialState,
	reducers: {},
});

export const selectHistorySettings = (state: RootState) => {
	return state.settings.history;
};
export const selectUserSettings = (state: RootState) => {
	return state.settings.user;
};
export const selectWorkoutSettings = (state: RootState) => {
	return state.settings.workout;
};
export const selectMedSettings = (state: RootState) => {
	return state.settings.medication;
};

export default settingsSlice.reducer;

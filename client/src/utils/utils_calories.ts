import { Activity } from "../features/activity/types";

export type METMap = Record<Activity | string, number>;

const MET_VALUES: METMap = {
	Walk: 3.8,
	Run: 8.0,
	Cycle: 7.5,
	Swim: 9.8,
	Strength: 6.0,
	Yoga: 2.5,
};

export interface CalcCaloriesOpts {
	weightInKg: number;
	durationMins: number;
}

const getCaloriesBurned = (activity: Activity, options: CalcCaloriesOpts) => {
	if (activity in MET_VALUES) {
		const hours = options.durationMins / 60;
		const caloriesBurned = MET_VALUES[activity] * options.weightInKg * hours;
		return Math.round(caloriesBurned);
	} else {
		return 0;
	}
};

export { MET_VALUES, getCaloriesBurned };

import { Activity, ActivityStyles } from "../features/activity/types";

const ACTIVITIES: Activity[] = [
	"Walk",
	"Strength",
	"Stretch",
	"Timed",
	"Cardio",
	"Other",
];

const ACTIVITY_STYLES: ActivityStyles = {
	Walk: {
		icon: "directions_walk",
		color: "var(--accent-blue)",
		bg: "",
	},
	Strength: {
		icon: "fitness_center",
		color: "var(--accent-purple)",
		bg: "",
	},
	Stretch: {
		icon: "stretching-2",
		color: "var(--accent-green)",
		bg: "",
	},
	Cardio: {
		icon: "heart-with-pulse",
		color: "var(--accent-red)",
		bg: "",
	},
	Timed: {
		icon: "timer",
		color: "var(--accent)",
		bg: "",
	},
	Other: {
		icon: "dots-three-horizontal",
		color: "var(--blueGrey900)",
		bg: "",
	},
} as const;

const getActivityStyles = (activityType: Activity) => {
	if (activityType in ACTIVITY_STYLES) {
		const item = ACTIVITY_STYLES[activityType];
		return item;
	} else {
		const item = ACTIVITY_STYLES.Other;
		return item;
	}
};

export { ACTIVITY_STYLES, ACTIVITIES, getActivityStyles };

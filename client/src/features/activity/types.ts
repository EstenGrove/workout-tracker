export type Activity =
	| "Walk"
	| "Strength"
	| "Stretch"
	| "Cardio"
	| "Timed"
	| "Other";

export interface ActivityStyle {
	icon: string;
	color: string;
	bg?: string;
}

export type ActivityStyles = Record<Activity, ActivityStyle>;

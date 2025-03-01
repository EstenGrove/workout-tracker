export type WeekDayToken = "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa";

const MONTHS: string[] = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export type RepeatType =
	| "Daily"
	| "Weekly"
	| "Monthly"
	| "Quarterly"
	| "Yearly"
	| "Custom"
	| "Never";

export type RepeatLabel =
	| "day"
	| "week"
	| "month"
	| "year"
	| "Never"
	| "Custom";

const REPEAT_TYPES: RepeatType[] = [
	"Daily",
	"Weekly",
	"Monthly",
	"Yearly",
	"Never",
	"Custom",
];
const REPEAT_LABELS: RepeatLabel[] = [
	"day",
	"week",
	"month",
	"year",
	"Never",
	"Custom",
];

export interface RecurringValues {
	interval: number | string;
	frequency: RepeatType;
	byDay: string[];
	byMonth: number | string;
	byMonthDay: number | string;
	[key: string]: string | number | Date | string[];
}

const REPEAT_TYPE_OPTIONS = [
	{ label: "Daily", value: "Daily" },
	{ label: "Weekly", value: "Weekly" },
	{ label: "Monthly", value: "Monthly" },
	{ label: "Yearly", value: "Yearly" },
	{ label: "Custom", value: "Custom" },
	{ label: "Never", value: "Never" },
];
const REPEAT_LABEL_OPTIONS = [
	{ label: "day", value: "Daily" },
	{ label: "week", value: "Weekly" },
	{ label: "month", value: "Monthly" },
	{ label: "year", value: "Yearly" },
	{ label: "Custom", value: "Custom" },
	{ label: "Never", value: "Never" },
];

// Descriptions map for 'nth' (eg 1st, 2nd, 3rd, 4th, etc...)
const numsMap = {
	1: "st",
	2: "nd",
	3: "rd",
	11: "th",
	12: "th",
	13: "th",
	21: "st",
	22: "nd",
	23: "rd",
	31: "st",
};

// 23 => "rd" (eg. "23rd")
const getMonthlySuffix = (dayOfMonth: number): string => {
	if (!dayOfMonth || dayOfMonth === 0 || dayOfMonth === null) return "";

	const lastNum = Number(String(dayOfMonth).slice(-1));

	if (lastNum < 4 && lastNum > 0) {
		const suffix = numsMap[dayOfMonth as keyof object];
		return suffix;
	} else {
		return "th";
	}
};

const getFrequencyLabel = (frequency: RepeatType, interval: number) => {
	const suffix = interval > 1 ? "s" : "";
	const opts = {
		Daily: "day",
		Weekly: "week",
		Monthly: "month",
		Yearly: "year",
		Custom: "",
	} as const;
	const prefix = opts[frequency as keyof object];

	return prefix + suffix;
};

export {
	MONTHS,
	REPEAT_TYPES,
	REPEAT_LABELS,
	REPEAT_TYPE_OPTIONS,
	REPEAT_LABEL_OPTIONS,
	getMonthlySuffix,
	getFrequencyLabel,
};

import {
	format,
	formatDistanceToNow,
	parse,
	set,
	startOfDay,
	endOfDay,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	startOfQuarter,
	endOfQuarter,
	startOfYear,
	endOfYear,
	subMonths,
	subYears,
	subQuarters,
	subWeeks,
} from "date-fns";

export type WeekDay =
	| "Sunday"
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday"
	| "Saturday";

const WEEK_DAYS: WeekDay[] = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

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

const QUARTERS: string[] = ["Q1", "Q2", "Q3", "Q4"];

const MONTHS_BY_QUARTER: Record<string, number[]> = {
	Q1: [0, 1, 2],
	Q2: [3, 4, 5],
	Q3: [6, 7, 8],
	Q4: [9, 10, 11],
};

const convertToHrsAndMins = (mins: number) => {
	return {
		hours: Math.trunc(mins >= 60 ? mins / 60 : 0),
		mins: mins >= 60 ? mins % 60 : mins,
	};
};

export interface DateRange {
	start: Date | string;
	end: Date | string;
}

export interface IDateRange {
	startDate: string;
	endDate: string;
}

const getMonthFromIdx = (month: number) => {
	const months = [
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

	const targetMonth = months[month];

	return targetMonth;
};

export interface DateFormats {
	date: {
		short: string;
		long: string;
		full: string;
		fullMonth: string;
		db: string;
		input: string;
		shortMonth: string;
		month: string;
		url: string;
	};
	time: {
		noTod: string;
		short: string;
		shortMs: string;
		long: string;
		mil: string;
		db: string;
	};
	datetime: {
		short: string;
		long: string;
		full: string;
		db: string;
		longMs: string;
	};
	weekday: {
		full: string; // 'Monday', 'Tuesday' etc
		abbrev: string; // 'Mon', 'Tue', etc
		twoLetter: string; // 'Mo', 'Tu' etc
		letter: string; // 'M', 'T', 'W', 'T' etc
	};
	custom: {
		monthAndDay: string;
	};
}

const FORMAT_TOKENS: DateFormats = {
	date: {
		short: "M/d/yy",
		long: "MM/dd/yyyy",
		full: "MMMM do, yyyy",
		fullMonth: "MMMM do",
		db: "yyyy-MM-dd",
		input: "yyyy-MM-dd",
		shortMonth: "MMM do, yyyy",
		month: "MMM",
		url: "MM-dd-yyyy",
	},
	time: {
		noTod: "hh:mm",
		short: "h:mm a",
		shortMs: "h:mm:ss a",
		long: "h:mm a",
		mil: "HH:mm a",
		db: "HH:mm",
	},
	datetime: {
		short: "M/d/yy h:mm a",
		long: "MM/dd/yyyy hh:mm a",
		full: "MMMM do, yyyy hh:mm a",
		longMs: "MM/dd/yyyy hh:mm:ss a",
		db: "yyyy-MM-dd HH:mm",
	},
	weekday: {
		full: "EEEE",
		abbrev: "EEE",
		twoLetter: "EEEEEE",
		letter: "EEEEE",
	},
	custom: {
		monthAndDay: "EEE, MMM do",
	},
};
const {
	date: DATE_TOKENS,
	time: TIME_TOKENS,
	datetime: DATETIME_TOKENS,
	weekday: WEEKDAY_TOKENS,
	custom: CUSTOM_TOKENS,
} = FORMAT_TOKENS;

const formatDate = (
	date: Date | string,
	formatToken: keyof DateFormats["date"] = "long"
): string => {
	if (!date) return "";
	const token = DATE_TOKENS[formatToken];
	const formatted = format(date, token);

	return formatted;
};

const formatTime = (
	date: Date | string,
	formatToken: keyof DateFormats["time"] = "long"
) => {
	if (!date) return "";
	const token = TIME_TOKENS[formatToken];
	const formatted = format(date, token);

	return formatted;
};

const formatDateTime = (
	date: Date | string,
	formatToken: keyof DateFormats["datetime"] = "db"
) => {
	if (!date) return "";
	const token = DATETIME_TOKENS[formatToken];
	const formatted = format(date, token);

	return formatted;
};

const formatCustomDate = (
	date: Date | string,
	formatToken: keyof DateFormats["custom"] = "monthAndDay"
) => {
	if (!date) return "";
	const token = CUSTOM_TOKENS[formatToken];
	const formatted = format(date, token);
	return formatted;
};

const parseDate = (
	dateStr: string,
	formatToken: keyof DateFormats["date"] = "db"
) => {
	const token = DATE_TOKENS[formatToken];
	const parsed = parse(dateStr, token, new Date());

	return parsed;
};

// Parses => '2024-11-22' & converts to a real date w/ a given format
const parseDateTime = (
	dateStr: string,
	formatToken: keyof DateFormats["datetime"] = "db"
) => {
	const token = DATETIME_TOKENS[formatToken];
	const parsedDate = parse(dateStr, token, new Date());

	return parsedDate;
};

const fromBackendFormat = (date: string) => {
	if (!date) return "";
	const str = new Date(date).toString();

	return str;
};

// ##TODOS:
// - Use this for 'parseTime' later on!!!
export interface TimeParseDeps {
	baseDate: Date | string;
	formatToken: keyof DateFormats["time"];
}

const parseTime = (
	timeStr: string,
	formatToken: keyof DateFormats["time"] = "long"
): Date => {
	const baseDate: Date = new Date();
	const token = TIME_TOKENS[formatToken as keyof object] || "hh:mm a";
	const parsed = parse(timeStr, token, baseDate);

	return parsed;
};

const getDistanceToNow = (date: Date | string) => {
	const distance = formatDistanceToNow(date);

	return distance;
};

const applyTimeStrToDate = (time: string, date: Date | string): Date => {
	const parsedTime = parseTime(time, "long");
	const withTime = set(date, {
		hours: parsedTime.getHours(),
		minutes: parsedTime.getMinutes(),
	});

	return withTime;
};

// Converts a date (eg '2024-12-18T03:42:000') to the day of week (eg. 'Monday' etc)
const formatDateAsWeekDay = (
	date: Date | string,
	weekdayToken: keyof DateFormats["weekday"] = "full"
): string => {
	const token: string = WEEKDAY_TOKENS[weekdayToken as keyof object];
	const weekday = format(date, token);

	return weekday;
};

const getWeekStartAndEnd = (base: Date | string = new Date()) => {
	const startDate = startOfWeek(base);
	const endDate = endOfWeek(base);

	return { startDate, endDate };
};
const getMonthStartAndEnd = (base: Date | string = new Date()) => {
	const startDate = startOfMonth(base);
	const endDate = endOfMonth(base);

	return { startDate, endDate };
};
const getYearStartAndEnd = (base: Date | string = new Date()) => {
	const startDate = startOfYear(base);
	const endDate = endOfYear(base);

	return { startDate, endDate };
};

// Converts date to ISO string
const prepareTimestamp = (date: Date | string) => {
	const base = new Date(date);

	return base.toISOString();
};

export type DateRangeType = "Day" | "Week" | "Month" | "Quarter" | "Year";

export type DateRangePreset =
	| "This Week"
	| "This Month"
	| "This Year"
	| "This Quarter"
	| "Today"
	| "Last Month"
	| "Last Week"
	| "Last Quarter"
	| "Last Year";

export interface RangeValues {
	startDate: string;
	endDate: string;
}

const getRangeFromPreset = (preset: DateRangePreset): RangeValues => {
	switch (preset) {
		case "This Week": {
			const start = startOfWeek(new Date());
			const end = startOfWeek(new Date());

			return {
				startDate: formatDate(start, "long"),
				endDate: formatDate(end, "long"),
			};
		}
		case "This Month": {
			const start = startOfMonth(new Date());
			const end = endOfMonth(new Date());

			return {
				startDate: formatDate(start, "long"),
				endDate: formatDate(end, "long"),
			};
		}
		case "This Quarter": {
			const start = startOfQuarter(new Date());
			const end = endOfQuarter(new Date());

			return {
				startDate: formatDate(start, "long"),
				endDate: formatDate(end, "long"),
			};
		}
		case "This Year": {
			const start = startOfYear(new Date());
			const end = endOfYear(new Date());

			return {
				startDate: formatDate(start, "long"),
				endDate: formatDate(end, "long"),
			};
		}
		case "Today": {
			const start = startOfDay(new Date());
			const end = endOfDay(new Date());

			return {
				startDate: formatDate(start, "long"),
				endDate: formatDate(end, "long"),
			};
		}
		case "Last Month": {
			const last = subMonths(new Date(), 1);
			const start = startOfMonth(last);
			const end = endOfMonth(last);

			return {
				startDate: formatDate(start, "long"),
				endDate: formatDate(end, "long"),
			};
		}
		case "Last Week": {
			const last = subWeeks(new Date(), 1);
			const start = startOfWeek(last);
			const end = endOfWeek(last);

			return {
				startDate: formatDate(start, "long"),
				endDate: formatDate(end, "long"),
			};
		}
		case "Last Quarter": {
			const last = subQuarters(new Date(), 1);
			const start = startOfQuarter(last);
			const end = endOfQuarter(last);

			return {
				startDate: formatDate(start, "long"),
				endDate: formatDate(end, "long"),
			};
		}
		case "Last Year": {
			const last = subYears(new Date(), 1);
			const start = startOfYear(last);
			const end = endOfYear(last);

			return {
				startDate: formatDate(start, "long"),
				endDate: formatDate(end, "long"),
			};
		}
		default:
			throw new Error("Invalid range type: " + preset);
	}
};

export {
	MONTHS,
	WEEK_DAYS,
	QUARTERS,
	MONTHS_BY_QUARTER,
	FORMAT_TOKENS,
	DATE_TOKENS,
	TIME_TOKENS,
	DATETIME_TOKENS,
	convertToHrsAndMins,
	getMonthFromIdx,
	formatDate,
	formatTime,
	formatDateTime,
	formatCustomDate,
	parseDateTime,
	parseTime,
	parseDate,
	fromBackendFormat,
	applyTimeStrToDate,
	getDistanceToNow,
	formatDateAsWeekDay,
	getWeekStartAndEnd,
	getMonthStartAndEnd,
	getYearStartAndEnd,
	getRangeFromPreset,
	// parsing & preparing utils
	prepareTimestamp,
};

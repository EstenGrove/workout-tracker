import {
	format,
	parse,
	set,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
} from "date-fns";

export interface ConvertTimeArgs {
	formatToken: string;
	baseDate: Date;
}
const defaultOpts = {
	formatToken: "hh:mm a",
	baseDate: new Date(),
};
// Merges a time string (eg. '1:30 PM' to a date => 'Sun Nov 03 2024 13:30:000 GMT-700...')
const convertTimeToDate = (
	time: string,
	options: ConvertTimeArgs = defaultOpts
) => {
	const parsed = parse(time, options.formatToken, options.baseDate);

	return parsed;
};

export interface DateFormats {
	date: {
		short: string;
		long: string;
		full: string;
		fullMonth: string;
		db: string;
		input: string;
	};
	time: {
		short: string;
		long: string;
		mil: string;
	};
	datetime: {
		short: string;
		long: string;
		full: string;
		db: string;
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
	},
	time: {
		short: "h:m a",
		long: "hh:mm a",
		mil: "HH:mm a",
	},
	datetime: {
		short: "M/d/yy h:m a",
		long: "MM/dd/yyyy hh:mm a",
		full: "MMMM do, yyyy hh:mm a",
		db: "yyyy-MM-dd HH:mm",
	},
};
const {
	date: DATE_TOKENS,
	time: TIME_TOKENS,
	datetime: DATETIME_TOKENS,
} = FORMAT_TOKENS;

const formatDate = (
	date: Date | string,
	formatToken: keyof DateFormats["date"] = "long"
): string => {
	const token = DATE_TOKENS[formatToken];
	const formatted = format(date, token);

	return formatted;
};

const formatTime = (
	date: Date | string,
	formatToken: keyof DateFormats["time"] = "long"
) => {
	const formatted = format(date, formatToken);

	return formatted;
};

const formatDateTime = (
	date: Date | string,
	formatToken: keyof DateFormats["datetime"] = "long"
) => {
	const formatted = format(date, formatToken);

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

// ##TODOS:
// - Use this for 'parseTime' later on!!!
export interface TimeParseDeps {
	baseDate: Date | string;
	formatToken: keyof DateFormats["time"];
}

const parseTime = (
	timeStr: string,
	baseDate: Date | string = new Date(),
	formatToken: keyof DateFormats["time"] = "long"
) => {
	const token = TIME_TOKENS[formatToken as keyof object] || "hh:mm a";
	const parsed = parse(timeStr, token, baseDate);

	return parsed;
};

const applyTimeStrToDate = (time: string, date: Date | string) => {
	const parsedTime = parseTime(time);
	const withTime = set(date, {
		hours: parsedTime.getHours(),
		minutes: parsedTime.getMinutes(),
	});

	return withTime;
};

const getWeekStartAndEnd = (date: Date = new Date()) => {
	const startDate = startOfWeek(date);
	const endDate = endOfWeek(date);

	return {
		startDate,
		endDate,
	};
};
const getMonthStartAndEnd = (date: Date = new Date()) => {
	const startDate = startOfMonth(date);
	const endDate = endOfMonth(date);

	return {
		startDate,
		endDate,
	};
};

export {
	// DATE & TIME TOKENS (formatting)
	FORMAT_TOKENS,
	DATETIME_TOKENS,
	DATE_TOKENS,
	TIME_TOKENS,
	// DATE UTILS
	convertTimeToDate,
	formatDate,
	formatTime,
	formatDateTime,
	parseTime,
	parseDate,
	parseDateTime,
	applyTimeStrToDate,
	getWeekStartAndEnd,
};

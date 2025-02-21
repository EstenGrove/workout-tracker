import { format, parseISO } from "date-fns";
import styles from "../../css/meds/MedicationLog.module.scss";
import { MedLogEntry } from "../../features/meds/types";
import {
	formatCustomDate,
	formatDate,
	fromBackendFormat,
	parseDate,
	parseDateTime,
} from "../../utils/utils_dates";
import MedLogItem from "./MedLogItem";

type Props = {
	logs: MedLogEntry[];
};

const getTotalTaken = (logs: MedLogEntry[]) => {
	const finalTotal = logs.reduce((total, item) => {
		return (total += Number(item.dose));
	}, 0);
	return finalTotal;
};

type LogsProps = {
	name: string;
	date: Date | string;
	logs: MedLogEntry[];
};

const getDateTitle = (date: string) => {
	if (!date) return "";
	const prepared = parseDate(date).toString();
	const parsed = fromBackendFormat(prepared);
	const formatted = formatCustomDate(parsed, "monthAndDay");

	return formatted;
};

const LogsByDate = ({ name, date, logs }: LogsProps) => {
	const totalTaken = getTotalTaken(logs);
	const logDate = getDateTitle(date as string);
	return (
		<li className={styles.LogsByDate}>
			<div className={styles.LogsByDate_header}>
				<h3 className={styles.LogsByDate_header_title}>{logDate}</h3>
				<div className={styles.LogsByDate_header_taken}>
					Taken: {totalTaken.toFixed(2)}
				</div>
			</div>
			<div className={styles.LogsByDate_logs}>
				{logs &&
					logs.map((log) => (
						<MedLogItem key={log.logID} name={name} logEntry={log} />
					))}
			</div>
		</li>
	);
};

const getDateKey = (log: MedLogEntry) => {
	const { loggedAt } = log;
	const str = fromBackendFormat(loggedAt as string);
	const formatted = formatDate(str, "db");

	return formatted;
};

const groupLogs = (logs: MedLogEntry[]): Record<string, MedLogEntry[]> => {
	if (!logs) return {};
	const results = [...logs].reduce((acc, item) => {
		const iteratee = getDateKey(item);
		if (!acc[iteratee as keyof object]) {
			acc[iteratee as keyof object] = [];
		}
		acc[iteratee as keyof object].push(item);
		return acc;
	}, {} as Record<string, MedLogEntry[]>);

	return results;
};

const MedicationLog = ({ logs }: Props) => {
	const logsByDate = groupLogs(logs);
	const dates = Object.keys(logsByDate).sort((a, b) => {
		return new Date(b).getTime() - new Date(a).getTime();
	});

	console.log("logsByDate", logsByDate);

	return (
		<div className={styles.MedicationLog}>
			<ul className={styles.MedicationLog_logs}>
				{dates &&
					dates.map((date) => {
						const logsForDate = logsByDate[date as keyof object];

						return (
							<LogsByDate
								key={date}
								name="Buprenorphine"
								date={date}
								logs={logsForDate}
							/>
						);
					})}
			</ul>
		</div>
	);
};

export default MedicationLog;

import styles from "../../css/history/WorkoutHistoryRangeHeader.module.scss";
import { ReactNode } from "react";
import { format } from "date-fns";
import {
	formatCustomDate,
	getDateRangeFromPreset,
	RangePreset,
} from "../../utils/utils_dates";
import Button from "../shared/Button";
import DateRangeSelector from "../form/DateRangeSelector";

type Props = {
	selectedPreset: RangePreset;
	openLogModal: () => void;
	onSelectPreset: (preset: RangePreset) => void;
};

const customCSS = {
	btn: {
		width: "max-content",
		marginLeft: "auto",
		borderRadius: "5rem",
		backgroundColor: "var(--accent-blue)",
	},
};

const LogButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button onClick={onClick} style={customCSS.btn}>
			Log
		</Button>
	);
};

type HeaderProps = {
	title: string;
	date?: Date | string;
	children?: ReactNode;
};

const getTodaysDate = (date?: Date | string) => {
	if (!date) {
		const now = new Date();
		const today = format(now, "EEE, MMM do");

		return today;
	} else {
		const today = format(date, "EEE, MMM do");
		return today;
	}
};

type TitlesProps = {
	title: string;
	date?: Date | string;
};

const Titles = ({ title, date }: TitlesProps) => {
	const today = getTodaysDate(date);
	return (
		<div className={styles.Titles}>
			<div className={styles.Titles_today}>{today}</div>
			<h2 className={styles.Titles_label}>{title}</h2>
		</div>
	);
};

const HistoryHeader = ({ title, date, children }: HeaderProps) => {
	return (
		<div className={styles.HistoryHeader}>
			<div className={styles.HistoryHeader_main}>
				<Titles title={title} date={date} />
				<div className={styles.HistoryHeader_main_right}>{children}</div>
			</div>
		</div>
	);
};

const getRangeDesc = (preset: RangePreset) => {
	const range = getDateRangeFromPreset(preset);

	switch (preset) {
		case "Today": {
			const start = formatCustomDate(range.startDate, "range");
			return `${start} (Today)`;
		}
		case "Yesterday": {
			const start = formatCustomDate(range.startDate, "range");
			return `${start} (Yesterday)`;
		}
		case "Last Month":
		case "Last Week":
		case "This Week":
		case "This Month": {
			const start = formatCustomDate(range.startDate, "range");
			const end = formatCustomDate(range.endDate, "range");

			return `${start} to ${end}`;
		}

		default:
			return "";
	}
};

const WorkoutHistoryRangeHeader = ({
	openLogModal,
	onSelectPreset,
	selectedPreset,
}: Props) => {
	const today = new Date();
	const rangeDesc = getRangeDesc(selectedPreset);
	return (
		<div className={styles.WorkoutHistoryRangeHeader}>
			<HistoryHeader title={`History ${""}`} date={today}>
				<LogButton onClick={openLogModal} />
			</HistoryHeader>
			<div className={styles.WorkoutHistoryRangeHeader_filters}>
				<div className={styles.WorkoutHistoryRangeHeader_filters_desc}>
					{rangeDesc}
				</div>
				<DateRangeSelector
					selectedPreset={selectedPreset}
					onSelect={onSelectPreset}
				/>
			</div>
		</div>
	);
};

export default WorkoutHistoryRangeHeader;

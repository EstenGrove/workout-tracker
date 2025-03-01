import { format } from "date-fns";
import { ReactNode } from "react";
import styles from "../../css/history/WorkoutHistoryHeader.module.scss";
import Button from "../shared/Button";
import WeeklyHeaderScrollable from "../layout/WeeklyHeaderScrollable";

type Props = {
	baseDate: Date | string;
	selectedDate: Date | string;
	openLogModal: () => void;
	onSelect: (name: string, date: Date | string) => void;
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

const WorkoutHistoryHeader = ({
	openLogModal,
	selectedDate,
	baseDate,
	onSelect,
}: Props) => {
	return (
		<div className={styles.WorkoutHistoryHeader}>
			<HistoryHeader title={`History ${""}`} date={selectedDate}>
				<LogButton onClick={openLogModal} />
			</HistoryHeader>
			<WeeklyHeaderScrollable
				onSelect={onSelect}
				baseDate={baseDate as string}
				selectedDate={selectedDate as string}
			/>
		</div>
	);
};

export default WorkoutHistoryHeader;

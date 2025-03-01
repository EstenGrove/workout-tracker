import sprite from "../../assets/icons/main.svg";
import styles from "../../css/meds/MedLogItem.module.scss";
import { MedLogEntry } from "../../features/meds/types";
import { formatTime } from "../../utils/utils_dates";
import { addEllipsis } from "../../utils/utils_misc";

const TakenBadge = () => {
	return (
		<div className={styles.TakenBadge}>
			<svg className={styles.TakenBadge_icon}>
				<use xlinkHref={`${sprite}#icon-double-tick`}></use>
			</svg>
		</div>
	);
};
const SkippedBadge = () => {
	return (
		<div className={styles.SkippedBadge}>
			<svg className={styles.SkippedBadge_icon}>
				<use xlinkHref={`${sprite}#icon-multiply`}></use>
			</svg>
		</div>
	);
};

type MedLogProps = {
	name?: string;
	logEntry: MedLogEntry;
};

const pillFractions = {
	"0.125": "1/8",
	"0.25": "1/4",
	"0.50": "1/2",
	"0.75": "3/4",
	"1.00": "1",
	"1.25": "1 1/4",
	"1.50": "1 1/2",
	"1.75": "1 3/4",
	"2.00": "2",
} as const;

const getPillFraction = (dose: number): string => {
	const fraction = pillFractions[dose as keyof object];

	return fraction;
};

const getAmountDesc = (logEntry: MedLogEntry) => {
	const { notes, dose } = logEntry;

	if (notes === "Taken") {
		return `Took ${dose}`;
	}

	if (notes === "Skipped") {
		return `Skipped`;
	}

	// unknown notes
	return dose;
};

const MedLogItem = ({ name = "Buprenorphine", logEntry }: MedLogProps) => {
	const { dose, notes, loggedAt, pillSizeInMg = 8 } = logEntry;
	const medName = addEllipsis(name, 10);
	const desc = getAmountDesc(logEntry);
	const mgTaken: number = dose * pillSizeInMg;
	const action: string = notes.toLowerCase();
	const doseage = getPillFraction(dose);

	return (
		<div className={styles.MedLogItem}>
			<div className={styles.MedLogItem_top}>
				{action.toUpperCase() === "TAKEN" && <TakenBadge />}
				{action.toUpperCase() === "SKIPPED" && <SkippedBadge />}
				<div className={styles.MedLogItem_top_head}>
					<div className={styles.MedLogItem_top_head_name}>
						{desc}, {medName}
					</div>
					<div className={styles.MedLogItem_top_head_time}>
						{formatTime(loggedAt, "long")}
					</div>
				</div>
			</div>
			<div className={styles.MedLogItem_bottom}>
				<div className={styles.MedLogItem_bottom_amount}>
					{notes === "Skipped" && "Dose was skipped"}
					{notes === "Taken" && (
						<span>
							<b>{doseage}</b> of a pill
						</span>
					)}
				</div>
				<div className={styles.MedLogItem_bottom_amount}>{mgTaken}mg</div>
			</div>
		</div>
	);
};

export default MedLogItem;

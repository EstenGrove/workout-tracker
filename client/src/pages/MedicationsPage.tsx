import styles from "../css/pages/MedicationsPage.module.scss";
import MedsHeader from "../components/meds/MedsHeader";
import WeeklyHeader from "../components/layout/WeeklyHeader";
import { useAppDispatch } from "../store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import { CurrentUser } from "../features/user/types";
import Button from "../components/shared/Button";
import Modal from "../components/layout/Modal";
import LogMedication from "../components/meds/LogMedication";
import TodaysDoses from "../components/meds/TodaysDoses";
import { MedLogEntry } from "../features/meds/types";
import PillSummary from "../components/meds/PillSummary";
import LoggedMedsCard from "../components/meds/LoggedMedsCard";

const fakeSummary = {
	totalPills: 60,
	pillsTaken: 47,
	pillsRemaining: 13.75,
	pillsTakenToday: 1.25,
};

const fakeLogs: MedLogEntry[] = [
	{
		logID: 1,
		scheduleID: 1,
		loggedAt: new Date(2025, 1, 4, 7, 38),
		dose: 0.25,
		notes: "Taken",
		pillSizeInMg: 8,
	},
	{
		logID: 1,
		scheduleID: 1,
		loggedAt: new Date(2025, 1, 4, 8, 8),
		dose: 0.0,
		notes: "Skipped",
		pillSizeInMg: 8,
	},
	{
		logID: 1,
		scheduleID: 1,
		loggedAt: new Date(2025, 1, 4, 8, 47),
		dose: 0.25,
		notes: "Taken",
		pillSizeInMg: 8,
	},
	{
		logID: 1,
		scheduleID: 1,
		loggedAt: new Date(2025, 1, 4, 9, 15),
		dose: 0.25,
		notes: "Taken",
		pillSizeInMg: 8,
	},
];

const MedicationsPage = () => {
	// const dispatch = useAppDispatch();
	const baseDate = new Date().toString();
	const [selectedDate, setSelectedDate] = useState<Date | string>(baseDate);
	const [showLogMedModal, setShowLogMedModal] = useState<boolean>(false);
	const currentUser: CurrentUser = useSelector(selectCurrentUser);

	const selectDate = (date: Date | string) => {
		setSelectedDate(date);
	};

	const openLogMedModal = () => {
		setShowLogMedModal(true);
	};

	const closeLogMedModal = () => {
		setShowLogMedModal(false);
	};

	return (
		<div className={styles.MedicationsPage}>
			<MedsHeader />
			<WeeklyHeader
				baseDate={baseDate}
				onSelect={selectDate}
				selectedDate={selectedDate}
			/>
			<div className={styles.MedicationsPage_body}>
				<div className={styles.MedicationsPage_body_actions}>
					<Button onClick={openLogMedModal}>Log Medication</Button>
				</div>
				<div className={styles.MedicationsPage_cards}>
					<div className={styles.MedicationsPage_cards_card}>
						<PillSummary
							title="Buprenorphine"
							pillsLeft={11.25}
							pillsTaken={48.75}
							totalPills={60}
							daysLeft={10}
						/>
					</div>
					<div className={styles.MedicationsPage_cards_card}>
						<LoggedMedsCard>
							<TodaysDoses
								medName="Buprenorphine"
								logs={fakeLogs}
								summary={fakeSummary}
							/>
						</LoggedMedsCard>
					</div>
					{/* CARDS FOR DIFFERENT MEDICATIONS */}
					{/* CARDS FOR DIFFERENT MEDICATIONS */}
				</div>
			</div>

			{showLogMedModal && (
				<Modal closeModal={closeLogMedModal}>
					<LogMedication logs={fakeLogs} summary={fakeSummary} />
				</Modal>
			)}
		</div>
	);
};

export default MedicationsPage;

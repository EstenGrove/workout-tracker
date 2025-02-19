import styles from "../css/pages/MedicationsPage.module.scss";
import { RootState, useAppDispatch } from "../store/store";
import { useState, useEffect, useCallback, ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import { CurrentUser } from "../features/user/types";
import {
	PillSummary as IPillSummary,
	SummaryForDate,
} from "../features/meds/types";
import {
	selectIsMedLoading,
	selectMedSummary,
} from "../features/meds/medsSlice";
import {
	getMedSummariesByDate,
	getUserMeds,
} from "../features/meds/operations";
import { formatDate } from "../utils/utils_dates";
import { useQueryParams } from "../hooks/useQueryParams";
// components
import Button from "../components/shared/Button";
import Modal from "../components/layout/Modal";
import LogMedication from "../components/meds/LogMedication";
import TodaysDoses from "../components/meds/TodaysDoses";
import PillSummary from "../components/meds/PillSummary";
import LoggedMedsCard from "../components/meds/LoggedMedsCard";
import MedsHeader from "../components/meds/MedsHeader";
import WeeklyHeader from "../components/layout/WeeklyHeader";
import Loader from "../components/layout/Loader";
import { isToday } from "date-fns";

const Layout = ({
	header,
	children,
}: {
	header: JSX.Element;
	children: ReactNode;
}) => {
	return (
		<div className={styles.Layout}>
			<div className={styles.Layout_header}>{header}</div>
			{children}
		</div>
	);
};

const customCSS = {
	log: {
		marginLeft: "auto",
		marginBottom: "2rem",
	},
};

const defaultDate = new Date();

interface CurrentMed {
	medID: number;
	name: string;
	scheduleID: number;
}

const MedicationsPage = () => {
	const dispatch = useAppDispatch();
	const { getParams, setParams } = useQueryParams();
	const base = getParams("selectedDate") as string;
	const baseDate = formatDate(base || defaultDate, "long");
	const isLoading: boolean = useSelector(selectIsMedLoading);
	const currentUser: CurrentUser = useSelector(selectCurrentUser);
	const medSummary: SummaryForDate = useSelector(selectMedSummary);
	const [selectedDate, setSelectedDate] = useState<string>(baseDate);
	const [showLogMedModal, setShowLogMedModal] = useState<boolean>(false);
	const [selectedMed, setSelectedMed] = useState<CurrentMed | null>({
		medID: 1,
		name: "Buprenorphine",
		scheduleID: 3,
	});
	const medDetails = useSelector((state: RootState) => selectMedSummary(state));
	const summary = medDetails.summaries[0];

	const selectDate = (date: Date | string) => {
		const dateStr = formatDate(date, "long");
		setSelectedDate(dateStr);
		setParams({
			selectedDate: dateStr,
		});
	};

	const openLogMedModal = () => {
		setShowLogMedModal(true);
	};

	const closeLogMedModal = () => {
		setShowLogMedModal(false);
	};

	const handleSave = async () => {
		const notToday = !isToday(selectedDate);
		if (notToday) {
			alert("Are you sure you want to log for a past date?");
			return;
		}

		fetchSummary();
		closeLogMedModal();
	};

	const fetchMedsList = useCallback(() => {
		const userID = currentUser.userID;
		const params = {
			userID: userID,
		};
		dispatch(getUserMeds(params));
	}, [currentUser.userID, dispatch]);

	// fetch med summary info
	const fetchSummary = useCallback(() => {
		const userID = currentUser.userID;
		const params = {
			userID: userID,
			targetDate: formatDate(selectedDate, "long"),
		};
		dispatch(getMedSummariesByDate(params));
	}, [currentUser.userID, dispatch, selectedDate]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (currentUser.userID && selectedDate) {
			fetchSummary();
			fetchMedsList();
		}

		return () => {
			isMounted = false;
		};
	}, [currentUser.userID, fetchMedsList, fetchSummary, selectedDate]);

	return (
		<div className={styles.MedicationsPage}>
			<MedsHeader selectedDate={selectedDate} />
			<WeeklyHeader
				baseDate={baseDate}
				onSelect={selectDate}
				selectedDate={selectedDate}
			/>

			<Layout
				header={
					<Button onClick={openLogMedModal} style={customCSS.log}>
						Log Medication
					</Button>
				}
			>
				{isLoading && <Loader />}
				{!isLoading && summary && (
					<div className={styles.MedicationsPage_cards}>
						<PillSummary
							title="Buprenorphine"
							medID={selectedMed?.medID as number}
							pillsLeft={summary?.pillsRemaining}
							pillsTaken={summary?.pillsTaken}
							totalPills={summary?.totalPills}
							daysLeft={summary?.daysLeft}
						/>
						<LoggedMedsCard pillsTakenToday={summary?.pillsTakenToday}>
							<TodaysDoses
								medName="Buprenorphine"
								logs={medSummary?.logs}
								summary={summary}
							/>
						</LoggedMedsCard>
					</div>
				)}
			</Layout>

			{showLogMedModal && (
				<Modal closeModal={closeLogMedModal}>
					<LogMedication
						medication={selectedMed as CurrentMed}
						logs={medSummary?.logs}
						summary={summary as IPillSummary}
						onSave={handleSave}
						selectedDate={selectedDate}
					/>
				</Modal>
			)}
		</div>
	);
};

export default MedicationsPage;

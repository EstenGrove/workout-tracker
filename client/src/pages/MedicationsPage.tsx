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
	selectSummaryByMedID,
} from "../features/meds/medsSlice";
import { getMedSummariesByDate } from "../features/meds/operations";
import { formatDate } from "../utils/utils_dates";
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
import { useParamState } from "../hooks/useParamState";

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

const MedicationsPage = () => {
	const dispatch = useAppDispatch();
	const baseDate = formatDate(new Date(), "long");
	const isLoading: boolean = useSelector(selectIsMedLoading);
	const currentUser: CurrentUser = useSelector(selectCurrentUser);
	const medSummary: SummaryForDate = useSelector(selectMedSummary);
	const [selectedDate, setSelectedDate] = useState<Date | string>(baseDate);
	const [showLogMedModal, setShowLogMedModal] = useState<boolean>(false);
	const summary = useSelector((state: RootState) =>
		selectSummaryByMedID(state, 1)
	);
	const { param, setParam } = useParamState(baseDate as string);
	console.log("param", param);

	const selectDate = (date: Date | string) => {
		const dateStr = formatDate(date, "long");
		setSelectedDate(dateStr);
		setParam("selectedDate", dateStr);
	};

	const openLogMedModal = () => {
		setShowLogMedModal(true);
	};

	const closeLogMedModal = () => {
		setShowLogMedModal(false);
	};

	// fetch med summary info
	const fetchSummary = useCallback(() => {
		const params = {
			userID: currentUser.userID,
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
		}

		return () => {
			isMounted = false;
		};
	}, [currentUser.userID, fetchSummary, selectedDate]);

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
							pillsLeft={summary.pillsRemaining}
							pillsTaken={summary.pillsTaken}
							totalPills={summary.totalPills}
							daysLeft={summary.daysLeft}
						/>
						<LoggedMedsCard pillsTakenToday={summary.pillsTakenToday}>
							<TodaysDoses
								medName="Buprenorphine"
								logs={medSummary.logs}
								summary={summary}
							/>
						</LoggedMedsCard>
					</div>
				)}
			</Layout>

			{showLogMedModal && (
				<Modal closeModal={closeLogMedModal}>
					<LogMedication
						medication={{ medID: 1, name: "Buprenorphine" }}
						logs={medSummary.logs}
						summary={summary as IPillSummary}
						onSave={() => {
							closeLogMedModal();
							fetchSummary();
						}}
					/>
				</Modal>
			)}
		</div>
	);
};

export default MedicationsPage;

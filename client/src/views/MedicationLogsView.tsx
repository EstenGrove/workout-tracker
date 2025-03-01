import { ReactNode, useEffect, useCallback, useState } from "react";
import {
	DateRangePreset,
	formatDate,
	getRangeFromPreset,
} from "../utils/utils_dates";
import sprite from "../assets/icons/calendar2.svg";
import styles from "../css/views/MedicationLogsView.module.scss";
import PageContainer from "../components/layout/PageContainer";
import Modal from "../components/layout/Modal";
import MedicationLog from "../components/meds/MedicationLog";
import SelectDateRangeBy from "../components/form/SelectDateRangeBy";
import { RootState, useAppDispatch } from "../store/store";
import { getMedLogsByRange } from "../features/meds/operations";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";

interface LogSettingsValues {
	medID: number;
	rangeType: FilterRangeType | null;
	startDate: Date | string;
	endDate: Date | string;
}

type FilterBtnProps = {
	children?: ReactNode;
	onClick: () => void;
};

const FilterButton = ({ children, onClick }: FilterBtnProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.FilterButton}>
			{children}
		</button>
	);
};

const FilterSummary = ({ settings }: { settings: LogSettingsValues }) => {
	const { startDate, endDate } = settings;
	const start = formatDate(startDate, "long");
	const end = formatDate(endDate, "long");
	return (
		<div className={styles.FilterSummary}>
			<span>{start}</span>
			<span> to </span>
			<span>{end}</span>
		</div>
	);
};

const LogFilterOptions = ({ settings, onChange, onSelect }) => {
	return (
		<div className={styles.LogFilterOptions}>
			<SelectDateRangeBy />
		</div>
	);
};

type FilterRangeType =
	| "byDay"
	| "byMonth"
	| "byQuarter"
	| "byYear"
	| "byCustom"
	| "byPreset";

const filterBtn = (
	<>
		<svg className={styles.FilterButton_icon}>
			<use xlinkHref={`${sprite}#icon-filter_alt`}></use>
		</svg>
		<span>Filter</span>
	</>
);

const MedicationLogsView = () => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const medicationLogs = useSelector(
		(state: RootState) => state.medications.logs
	);
	const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [rangePreset, setRangePreset] = useState<DateRangePreset>("This Month");
	const [logSettings, setLogSettings] = useState<LogSettingsValues>({
		medID: 1,
		rangeType: "byPreset",
		startDate: formatDate(new Date(), "short"),
		endDate: formatDate(new Date(), "short"),
	});

	const openSettingsModal = () => {
		setShowSettingsModal(true);
	};
	const closeSettingsModal = () => {
		setShowSettingsModal(false);
	};

	const getFilteredData = useCallback(() => {
		const range = getRangeFromPreset(rangePreset);
		const params = {
			userID: currentUser.userID,
			medID: logSettings.medID,
			startDate: range.startDate,
			endDate: range.endDate,
		};

		// fetch data with range
		dispatch(getMedLogsByRange(params));
	}, [currentUser.userID, dispatch, logSettings.medID, rangePreset]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		getFilteredData();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.MedicationLogsView}>
			<div className={styles.MedicationLogsView_filter}>
				<FilterButton onClick={openSettingsModal}>This Month</FilterButton>
				<FilterButton onClick={openSettingsModal}>{filterBtn}</FilterButton>
			</div>
			<div className={styles.MedicationLogsView_logs}>
				<div className={styles.MedicationLogsView_logs_search}>
					{/*  */}
					{/*  */}
				</div>
				<div className={styles.MedicationLogsView_logs_list}>
					<MedicationLog logs={medicationLogs} />
				</div>
			</div>

			{showSettingsModal && (
				<Modal closeModal={closeSettingsModal}>
					<LogFilterOptions />
				</Modal>
			)}
		</div>
	);
};

export default MedicationLogsView;

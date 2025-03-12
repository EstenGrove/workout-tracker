import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import NavArrows from "../components/layout/NavArrows";
import PageContainer from "../components/layout/PageContainer";
import styles from "../css/pages/HistoryDetailsPage.module.scss";
import { useSelector } from "react-redux";
import { selectHistoryEntry } from "../features/history/historySlice";
import { selectCurrentUser } from "../features/user/userSlice";
import { useAppDispatch } from "../store/store";
import { getHistoryDetails } from "../features/history/operations";

const HistoryDetailsPage = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const historyID: number = Number(id);
	const currentUser = useSelector(selectCurrentUser);
	const historyDetails = useSelector(selectHistoryEntry);

	const getHistoryInfo = useCallback(() => {
		const { userID } = currentUser;
		const params = { userID, historyID };
		dispatch(getHistoryDetails(params));
	}, [currentUser, dispatch, historyID]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		// fetch history details, when we get an ID from route
		getHistoryInfo();

		return () => {
			isMounted = false;
		};
	}, [getHistoryInfo]);

	return (
		<PageContainer>
			<div className={styles.HistoryDetailsPage}>
				<NavArrows />
				<h1>History Details: {historyID}</h1>
				{/*  */}
				{/*  */}
			</div>
		</PageContainer>
	);
};

export default HistoryDetailsPage;

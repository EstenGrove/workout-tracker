import { useSelector } from "react-redux";
import PageContainer from "../components/layout/PageContainer";
import styles from "../css/pages/UserPage.module.scss";
import { CurrentUser } from "../features/user/types";
import { selectCurrentUser } from "../features/user/userSlice";
import { PageTabButton, PageTabs } from "../components/layout/PageTabs";
import { useResolvedPath } from "react-router";
import HealthProfile from "../components/user/HealthProfile";

const getInitials = (user: CurrentUser) => {
	if (!user || !("firstName" in user) || !("lastName" in user)) {
		return "NU";
	} else {
		const { firstName, lastName } = user;
		const first = firstName.slice(0, 1);
		const last = lastName.slice(0, 1);
		const initials = first + last;
		return initials;
	}
};

const UserBadge = ({ currentUser }: { currentUser: CurrentUser }) => {
	const initials = getInitials(currentUser);
	return (
		<div className={styles.UserBadge}>
			<div>{initials}</div>
		</div>
	);
};

const createTo = (basePath: string, route: string) => {
	const parts = basePath.split("/");
	const newPath = parts[1];

	return newPath + "/" + route;
};

const UserPage = () => {
	const path = useResolvedPath(".");
	const currentUser = useSelector(selectCurrentUser);

	return (
		<PageContainer>
			<div className={styles.UserPage}>
				<div className={styles.UserPage_nav}>
					<PageTabs>
						<PageTabButton to="">Health</PageTabButton>
						<PageTabButton to="settings">Settings</PageTabButton>
					</PageTabs>
				</div>
				<div className={styles.UserPage_header}>
					<UserBadge currentUser={currentUser} />
					<h1>
						{currentUser.firstName} {currentUser.lastName}
					</h1>
				</div>
				<div className={styles.UserPage_header_main}>
					<HealthProfile />
				</div>
			</div>
		</PageContainer>
	);
};

export default UserPage;

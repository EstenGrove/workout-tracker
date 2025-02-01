import { Outlet } from "react-router";
import styles from "../css/pages/AppLayout.module.scss";
import Navbar from "../components/layout/Navbar";

const AppLayout = () => {
	return (
		<div className={styles.AppLayout}>
			<Outlet />
			<Navbar />
		</div>
	);
};

export default AppLayout;

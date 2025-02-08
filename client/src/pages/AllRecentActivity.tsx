import styles from "../css/pages/AllRecentActivity.module.scss";
import PageContainer from "../components/layout/PageContainer";
import NavArrows from "../components/layout/NavArrows";

const AllRecentActivity = () => {
	return (
		<PageContainer>
			<div className={styles.AllRecentActivity}>
				<NavArrows />
				<h2>Recent Activity (All)</h2>
			</div>
		</PageContainer>
	);
};

export default AllRecentActivity;

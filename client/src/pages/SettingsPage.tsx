import PageContainer from "../components/layout/PageContainer";
import styles from "../css/pages/SettingsPage.module.scss";

const SettingsPage = () => {
	return (
		<PageContainer>
			<div className={styles.SettingsPage}>
				<h1>Settings</h1>
			</div>
		</PageContainer>
	);
};

export default SettingsPage;

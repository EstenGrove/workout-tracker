import { ReactNode } from "react";
import styles from "../../css/layout/PageContainer.module.scss";

type Props = { children: ReactNode };

const PageContainer = ({ children }: Props) => {
	return <div className={styles.PageContainer}>{children}</div>;
};

export default PageContainer;

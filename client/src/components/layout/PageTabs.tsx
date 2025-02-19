import { ReactNode } from "react";
import styles from "../../css/layout/PageTabs.module.scss";
import { NavLink } from "react-router";

type NavButtonProps = {
	to: string;
	children?: ReactNode;
};

const isActiveRoute = ({ isActive }: { isActive: boolean }) => {
	if (isActive) {
		return `${styles.PageTabButton} ${styles.isActive}`;
	} else {
		return styles.PageTabButton;
	}
};

const PageTabButton = ({ to, children }: NavButtonProps) => {
	return (
		<NavLink to={to} className={isActiveRoute}>
			{children}
		</NavLink>
	);
};

type Props = { children: ReactNode };

const PageTabs = ({ children }: Props) => {
	return (
		<div className={styles.PageTabs}>
			<div className={styles.PageTabs_inner}>
				{children}
				{/*  */}
			</div>
		</div>
	);
};

export { PageTabs, PageTabButton };

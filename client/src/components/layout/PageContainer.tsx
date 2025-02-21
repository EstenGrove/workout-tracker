import { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "../../css/layout/PageContainer.module.scss";

interface Props {
	children: ReactNode;
}

// @ts-expect-error: this is fine
interface PageProps extends Props, ComponentPropsWithoutRef<"div"> {}

const PageContainer = ({ children, ...rest }: PageProps) => {
	return (
		<div className={styles.PageContainer} {...rest}>
			{children}
		</div>
	);
};

export default PageContainer;

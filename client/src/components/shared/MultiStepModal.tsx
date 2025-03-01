import { ReactNode, useMemo, useRef, useState, useEffect } from "react";
import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/shared/MultiStepModal.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

type Props = {
	steps: StepItem[];
	onClose: () => void;
	onSave?: () => void; // last step's SaveButton
	onPrev?: () => void; // last step's SaveButton
	onNext?: () => void; // last step's SaveButton
};

export interface StepItem {
	id: number;
	title: string;
	content: JSX.Element | ReactNode;
	prev?: number;
	next?: number;
	validate?: () => boolean;
}

type NavButtonProps = {
	onClick: () => void;
	isDisabled?: boolean;
};

const PrevButton = ({ onClick }: NavButtonProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.PrevButton}>
			Back
		</button>
	);
};
const NextButton = ({ onClick, isDisabled = false }: NavButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isDisabled}
			className={styles.NextButton}
		>
			Next
		</button>
	);
};
const SaveButton = ({ onClick }: NavButtonProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.SaveButton}>
			Save
		</button>
	);
};

const isFinalStep = (currentStep: StepItem, steps: StepItem[]): boolean => {
	const lastID = steps[steps.length - 1].id;
	const currentID = currentStep.id;

	return currentID === lastID;
};

const MultiStepModal = ({ steps, onClose, onNext, onPrev, onSave }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	useBackgroundBlur();
	useLockBodyScroll();
	useOutsideClick(modalRef, onClose);
	const [currentStepID, setCurrentStepID] = useState<number>(1);
	const currentStep: StepItem = useMemo(() => {
		const step = steps.find((item: StepItem) => item.id === currentStepID);
		return step as StepItem;
	}, [currentStepID, steps]);
	const [isStepValid, setIsStepValid] = useState<boolean>(false);
	const hasPrev = currentStep && "prev" in currentStep;
	const hasNext = currentStep && "next" in currentStep;
	const isLastStep = isFinalStep(currentStep, steps);

	const handleNext = () => {
		if (hasNext) {
			const nextID = currentStep.next as number;
			setCurrentStepID(nextID);

			return onNext && onNext();
		}
	};
	const handlePrev = () => {
		if (hasPrev) {
			const prevID = currentStep.prev as number;
			setCurrentStepID(prevID);

			return onPrev && onPrev();
		}
	};

	const handleSave = () => {
		return onSave && onSave();
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (currentStep?.validate) {
			setIsStepValid(currentStep.validate());
		}

		return () => {
			isMounted = false;
		};
	}, [currentStep]);

	return (
		<div ref={modalRef} className={styles.MultiStepModal}>
			<div className={styles.MultiStepModal_top}>
				<svg className={styles.MultiStepModal_top_close}>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</div>
			<div className={styles.MultiStepModal_main}>{currentStep.content}</div>

			<div className={styles.MultiStepModal_footer}>
				{isLastStep ? (
					<>
						{hasPrev && <PrevButton onClick={handlePrev} />}
						<SaveButton onClick={handleSave} isDisabled={!isStepValid} />
					</>
				) : (
					<>
						{hasPrev && <PrevButton onClick={handlePrev} />}
						{hasNext && (
							<NextButton onClick={handleNext} isDisabled={!isStepValid} />
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default MultiStepModal;

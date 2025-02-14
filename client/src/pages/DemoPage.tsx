import { useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import styles from "../css/pages/DemoPage.module.scss";
import { useLocationTracker } from "../hooks/useLocationTracker";
import { Coords } from "../utils/utils_steps";

const DemoPage = () => {
	const [allCoords, setAllCoords] = useState<GeolocationPosition[]>([]);
	// Version #1:

	// Version #2
	const tracker = useLocationTracker({
		onSuccess(position) {
			if (!tracker.isTracking) return;
			setAllCoords([...allCoords, position]);
		},
	});
	const { id, isTracking, prevPosition, currentPosition, distanceInFeet } =
		tracker;
	const prevCoords = prevPosition as Coords;
	const currentCoords = currentPosition as Coords;

	const start = () => {
		tracker.start();
	};
	const stop = () => {
		tracker.stop();
	};

	return (
		<PageContainer>
			<div className={styles.DemoPage}>
				<h2>DEMO(S)</h2>
				<h4>Watch ID: {id}</h4>

				<button onClick={start}>Start Tracking</button>
				<button onClick={stop}>Stop Tracking</button>
				<br />
				<br />
				<br />
				<div>Is Tracking: {isTracking ? "Yes, tracking steps" : "No"}</div>
				<div>Total Distance: {distanceInFeet} ft</div>
				<div>Coords Count: {allCoords?.length || 0}</div>
				<br />
				<br />
				<div>
					Position(prev): {prevCoords?.latitude || 0},{" "}
					{prevCoords?.longitude || 0}
				</div>
				<div>
					Position(current): {currentCoords?.latitude || 0},{" "}
					{currentCoords?.longitude || 0}
				</div>
			</div>
		</PageContainer>
	);
};

export default DemoPage;

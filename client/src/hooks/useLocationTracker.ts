import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Coords, getDistanceInFeet } from "../utils/utils_steps";

interface HookParams {
	onSuccess?: (position: GeolocationPosition) => void;
	onError?: (err: GeolocationPositionError) => void;
	options?: PositionOptions;
}

const defaultSettings: PositionOptions = {
	enableHighAccuracy: false,
	maximumAge: 2 * 1000, // 10 seconds
	// maximumAge: 30 * 1000,
	timeout: 2000, // 2 seconds
};
const defaultParams: HookParams = {
	onSuccess(position: GeolocationPosition) {
		return position;
	},
	onError(err: GeolocationPositionError) {
		return err;
	},
	options: defaultSettings,
};

let watchID: number | null = null;

const useLocationTracker = (params: HookParams = defaultParams) => {
	const {
		options = defaultParams.options,
		onError = defaultParams.onError,
		onSuccess = defaultParams.onSuccess,
	} = params;

	// const watchID = useRef<number | null>(null);
	const [isTracking, setIsTracking] = useState<boolean>(false);
	const [prevPosition, setPrevPosition] = useState<Coords | null>(null);
	const [currentPosition, setCurrentPosition] = useState<Coords | null>(null);
	const distanceInFeet = useMemo(() => {
		if (prevPosition && currentPosition) {
			const { latitude: prevLat, longitude: prevLong } = prevPosition;
			const { latitude: currLat, longitude: currLong } = currentPosition;

			const distance = getDistanceInFeet(prevLat, prevLong, currLat, currLong);

			return distance;
		}

		return 0;
	}, [currentPosition, prevPosition]);

	const startTracking = () => {
		setIsTracking(true);
	};
	const stopTracking = () => {
		setIsTracking(false);
		setPrevPosition(null);
		setCurrentPosition(null);
		// watchID.current = null;
		watchID = null;
	};

	const handleSuccess = useCallback(
		(position: GeolocationPosition) => {
			if (!isTracking) return;

			const { coords, timestamp } = position;
			const newPosition: Coords = {
				latitude: coords.latitude,
				longitude: coords.longitude,
				timestamp: timestamp,
			};

			// set initial position, if null
			if (!prevPosition) {
				setPrevPosition(newPosition);
				// return onSuccess && onSuccess(position);
			} else {
				setCurrentPosition(newPosition);
				// return onSuccess && onSuccess(position);
			}
		},
		[isTracking, prevPosition]
	);

	const handleError = useCallback(
		(err: GeolocationPositionError) => {
			if (!err) return;
			if (!isTracking) return;

			return onError && onError(err);
		},
		[isTracking, onError]
	);

	// When tracking is enabled, start tracking position coords
	useEffect(() => {
		if (!isTracking) return;

		// const handleError = (err: GeolocationPositionError) => {
		// 	if (!err) return;
		// 	if (!isTracking) return;

		// 	return onError && onError(err);
		// };

		// const handleSuccess = (position: GeolocationPosition) => {
		// 	if (!isTracking) return;

		// 	const { coords, timestamp } = position;
		// 	const newPosition: Coords = {
		// 		latitude: coords.latitude,
		// 		longitude: coords.longitude,
		// 		timestamp: timestamp,
		// 	};

		// 	// set initial position, if null
		// 	if (!prevPosition) {
		// 		setPrevPosition(newPosition);
		// 		// return onSuccess && onSuccess(position);
		// 	} else {
		// 		setCurrentPosition(newPosition);
		// 		// return onSuccess && onSuccess(position);
		// 	}
		// };

		// watchID.current = navigator.geolocation.watchPosition(
		watchID = navigator.geolocation.watchPosition(
			handleSuccess,
			handleError,
			options
		);

		return () => {
			const id = watchID as number;
			if (id) {
				navigator.geolocation.clearWatch(id);
				watchID = null;
			}
		};
	}, [handleError, handleSuccess, isTracking, onError, onSuccess, options]);

	return {
		// id: watchID?.current,
		id: watchID as number,
		stop: stopTracking,
		start: startTracking,
		isTracking: isTracking,
		prevPosition: prevPosition,
		currentPosition: currentPosition,
		distanceInFeet: distanceInFeet,
	};
};

export { useLocationTracker };

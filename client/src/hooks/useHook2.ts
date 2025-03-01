import { useEffect, useMemo, useRef, useState } from "react";
import { Coords, getDistanceInFeet } from "../utils/utils_steps";

interface HookParams {
	onSuccess?: (position: GeolocationPosition) => void;
	onError?: (err: GeolocationPositionError) => void;
	options?: PositionOptions;
}

const defaultSettings: PositionOptions = {
	enableHighAccuracy: true,
	maximumAge: 10 * 1000, // 10 seconds
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

const useGeoTracker = (params: HookParams = defaultParams) => {
	const {
		options = defaultParams.options,
		onError = defaultParams.onError,
		onSuccess = defaultParams.onSuccess,
	} = params;

	const watchID = useRef<number | null>(null);
	// const [allCoords, setAllCoords] = useState<Coords[]>([]);
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
		watchID.current = null;
	};

	// When tracking is enabled, start tracking position coords
	useEffect(() => {
		if (!isTracking) return;

		const handleError = (err: GeolocationPositionError) => {
			if (!err) return;
			if (!isTracking) return;

			return onError && onError(err);
		};

		const handleSuccess = (position: GeolocationPosition) => {
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
				return onSuccess && onSuccess(position);
			} else {
				setCurrentPosition(newPosition);
				return onSuccess && onSuccess(position);
			}
		};

		watchID.current = navigator.geolocation.watchPosition(
			handleSuccess,
			handleError,
			options
		);

		return () => {
			// isMounted = false;
			const id = watchID.current;
			if (id) {
				navigator.geolocation.clearWatch(id);
				watchID.current = null;
			}
		};
	}, [isTracking, onError, onSuccess, options, prevPosition]);

	return {
		id: watchID?.current,
		stop: stopTracking,
		start: startTracking,
		isTracking: isTracking,
		prevPosition: prevPosition,
		currentPosition: currentPosition,
		distanceInFeet: distanceInFeet,
	};
};

export { useGeoTracker };

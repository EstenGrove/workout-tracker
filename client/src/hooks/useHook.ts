import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Coords, getDistanceInFeet } from "../utils/utils_steps";

const getCoords = (): Coords => {
	let currentCoords: Coords | undefined;
	navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
		const { coords } = position;
		currentCoords = {
			latitude: coords.latitude,
			longitude: coords.longitude,
			timestamp: position.timestamp,
		} as Coords;
	});

	return currentCoords as Coords;
};

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
	const { onSuccess, onError, options } = params;

	const watchID = useRef<number | null>(null);
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

	const successHandler = useCallback(
		(position: GeolocationPosition) => {
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
			}
		},
		[onSuccess, prevPosition]
	);

	const errorHandler = useCallback(
		(err: GeolocationPositionError) => {
			if (!err) return;

			return onError && onError(err);
		},
		[onError]
	);

	// When tracking is enabled, start tracking position coords
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (isTracking) {
			// const startingCoords = getCoords();
			// setPrevPosition(startingCoords);
			watchID.current = navigator.geolocation.watchPosition(
				(position: GeolocationPosition) => {
					successHandler(position);
				},
				(err: GeolocationPositionError) => {
					errorHandler(err);
				},
				options
			);
			console.log("watchID?.current", watchID?.current);
		}

		return () => {
			isMounted = false;
			const id = watchID.current;
			if (id) {
				navigator.geolocation.clearWatch(id);
			}
		};
	}, [errorHandler, isTracking, options, successHandler]);

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

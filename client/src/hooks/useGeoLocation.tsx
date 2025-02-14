import { Coords } from "../utils/utils_steps";
import { useRef, useState, useEffect } from "react";

const useGeoLocation = () => {
	const watchID = useRef<number | null>(null);
	const [prevPosition, setPrevPosition] = useState<Coords | null>(null);
	const [currentPosition, setCurrentPosition] = useState<Coords | null>(null);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		const handleSuccess = (position: GeolocationPosition) => {
			const { coords, timestamp } = position;
			const newPosition: Coords = {
				latitude: coords.latitude,
				longitude: coords.longitude,
				timestamp: timestamp,
			};

			if (!prevPosition) {
				setPrevPosition(newPosition);
			} else {
				setCurrentPosition(newPosition);
			}
		};

		const handleError = (err: GeolocationPositionError) => {
			return err;
		};

		watchID.current = navigator.geolocation.watchPosition(
			handleSuccess,
			handleError,
			{ enableHighAccuracy: false, maximumAge: 10 * 1000 }
		);

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		prevPosition,
		currentPosition,
		id: watchID?.current,
	};
};

export { useGeoLocation };

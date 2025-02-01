export type TParams = {
	[key: string]: string | number | boolean;
};

const upsertQueryParams = (paramsObj: TParams) => {
	const url = new URL(window.location.href);
	for (const [key, val] of Object.entries(paramsObj)) {
		url.searchParams.set(key, val as string);
	}
	history.pushState({}, "", url);
};

const removeQueryParams = (keysToRemove: string[]) => {
	const url = new URL(window.location.href);
	for (let i = 0; i < keysToRemove.length; i++) {
		const key = keysToRemove[i];
		url.searchParams.delete(key);
	}
	window.history.pushState({}, "", url);
};

const removeAllQueryParams = () => {
	const url = window.location.origin + window.location.pathname;
	window.history.replaceState({}, document.title, url);
};

const getQueryParams = (paramKey?: string): TParams => {
	const raw = new URLSearchParams(window.location.search);
	// if no key provided, return all query params
	if (!paramKey) {
		const params = Object.fromEntries([...raw]);
		return params;
	} else {
		// return only param for given key, must normalize the key since urls will make all keys lowercase
		const param = raw.get(paramKey.toLowerCase());
		return {
			[paramKey]: param,
		} as TParams;
	}
};

export {
	upsertQueryParams,
	getQueryParams,
	removeQueryParams,
	removeAllQueryParams,
};

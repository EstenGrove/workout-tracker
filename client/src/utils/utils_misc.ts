const addEllipsis = (str: string, maxLength: number = 10) => {
	if (str.length < maxLength) return str;

	const newStr = str.slice(0, maxLength - 3) + "...";

	return newStr;
};

export { addEllipsis };

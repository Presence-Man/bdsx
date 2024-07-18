

export function parseDuration(input: string): number {
	const components = input.split(/\s*,\s*/);
	let totalMillis = 0;

	for (const component of components) {
		const [value, unit] = component.split(/\s+/);
		const numericValue = parseInt(value, 10);

		if (!isNaN(numericValue)) {
			switch (unit) {
				case "year":
				case "years":
				case "y":
					totalMillis += numericValue * 365 * 24 * 60 * 60 * 1000;
					break;
				case "month":
				case "months":
				case "mo":
					totalMillis += numericValue * 30 * 24 * 60 * 60 * 1000;
					break;
				case "week":
				case "weeks":
				case "w":
					totalMillis += numericValue * 7 * 24 * 60 * 60 * 1000;
					break;
				case "day":
				case "days":
				case "d":
					totalMillis += numericValue * 24 * 60 * 60 * 1000;
					break;
				case "hour":
				case "hours":
				case "h":
					totalMillis += numericValue * 60 * 60 * 1000;
					break;
				case "minute":
				case "minutes":
				case "min":
				case "s":
					totalMillis += numericValue * 60 * 1000;
					break;
				case "second":
				case "seconds":
				case "sec":
					totalMillis += numericValue * 1000;
					break;
				default:
					throw `Invalid unit: ${unit}`;
			}
		} else {
			throw `Invalid numeric value: ${value}`;
		}
	}

	return totalMillis;
}


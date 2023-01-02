export const customReplacer = (str, replacements) => {
	for (const entry of Object.entries(replacements)) {
		str = str.split(entry[0]).join(entry[1]);
	}
	return str;
};

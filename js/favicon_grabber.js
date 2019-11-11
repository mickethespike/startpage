
const iconCacheKey = "iconCache/";

/**
 * Requests an icon, caching it on success.
 * @param {URL} siteUrl The site URL.
 * @returns {string} The icon URL.
 */
async function sendFaviconRequest(siteUrl) {
	if (!siteUrl || !(siteUrl instanceof URL))
		return null;

	const hostname = siteUrl.hostname;
	const cachePath = iconCacheKey + hostname;
	const cachedIcon = getLocalStorage().getItem(cachePath);
	if (cachedIcon && cachedIcon.length > 0)
		return cachedIcon;

	let iconPath = await callFaviconGrabber(hostname);

	if (iconPath)
		getLocalStorage().setItem(cachePath, iconPath);

	return iconPath;
}

async function callFaviconGrabber(hostname) {
	const requestUrl = "https://favicongrabber.com/api/grab/" + hostname;
	const apiResponse = await fetch(requestUrl, { mode: "cors" });
	const result = await apiResponse.json();

	if (result.icons && result.icons.length > 0) {
		return result.icons[0].src;
	}
	return null;
}

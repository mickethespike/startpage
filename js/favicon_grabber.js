
const iconCacheKey = "iconCache/";

async function sendFaviconRequest(siteUrl) {
	if (!siteUrl)
		return null;

	const url = new URL(siteUrl);
	const hostname = url.hostname;
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
	const requestUrl = "http://favicongrabber.com/api/grab/" + hostname;
	const apiResponse = await fetch(requestUrl, { mode: "cors" });
	const result = await apiResponse.json();

	if (result.icons && result.icons.length > 0) {
		return result.icons[0].src;
	}
	return null;
}
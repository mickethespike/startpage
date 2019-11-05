
const domParser = new DOMParser();

async function sendFaviconRequest(siteUrl) {
	const response = await fetch(siteUrl);
	const html = await response.text();
	const htmlDoc = domParser.parseFromString(html, "text/html");
	
	const links = htmlDoc.head.getElementsByTagName("link");
	for (const link of links) {
		if (link.rel.includes("icon")) {
			console.log(link);
		}
	}
}
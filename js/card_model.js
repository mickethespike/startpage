
class CardEditModel {
	get title() {
		return this.titleSpan.innerHTML;
	}

	get id() {

	}

	static fromHtmlElement(element) {
		const model = new CardEditModel();
		model.titleDiv = element.getElementsByClassName("card-title")[0];
		model.iconDiv = model.titleDiv.getElementsByTagName("div")[0];
		model.titleSpan = model.titleDiv.getElementsByTagName("span")[0];

		//model.
		return model;
	}
}

function validateCardData(cardData) {
	try {
		if (cardData.buttonUrl)
			cardData.buttonUrl = new URL(cardData.buttonUrl);
	}
	catch (e) {
		console.warn("Failed to construct button URL from", '"' + cardData.buttonUrl + '"');
		delete cardData.buttonUrl;
		return false;
	}
	return true;
}

/**
 * Updates the card's icon.
 * This function exists as icons can be requested asynchrounsly after a card's HTML is created.
 * @param {any} cardData The card data.
 * @param {HTMLElement} node The card node to update.
 */
function updateCardIcon(cardData, node) {
	const cardIconDiv = node.getElementsByClassName("card-icon")[0];
	if (cardData.customIconUrl) {
		cardIconDiv.innerHTML = generateCardIconHtml(cardData.customIconUrl);
	}
	else {
		sendFaviconRequest(cardData.buttonUrl).then((iconUrl) => {
			if (iconUrl)
				cardIconDiv.innerHTML = generateCardIconHtml(iconUrl);
		}).catch();
	}
}

function generateCardIconHtml(url) {
	return `<img class="previewIcon" src="${url}" width="24" height="24" />`;
}

/**
 * Generates HTML for a card.
 * This method does not reserve an <img> for the card icon, use "updateCardIcon" after card creation.
 * @param {any} cardData The card data.
 * @returns {string} The generated card HTML.
 */
function generateCardHtml(cardData) {
	let cardSearchBox = "";
	if (cardData.searchBase) {
		cardSearchBox = `
		<div class="input-group mb-3" searchbase="${cardData.searchBase}">
			<input type="text" class="form-control" id="searchgithub" placeholder="${cardData.searchPlaceholder}" aria-label="${cardData.searchButtonLabel}" aria-describedby="basic-addon2" onkeypress="actionOnEnter(event)">
			<div class="input-group-append" onclick="buttonQuerySite(this)">
				<button class="btn btn-outline-secondary" tabIndex="-1" type="button">Search</button>
			</div>
		</div>`;
	}

	return `
	<div class="card" data-id=${cardData.id}>
		<div class="card-body">
			<div class="dropdown">
				<button type="button" class="dropdown-toggle card-settings fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="#" onclick="startEditingCard(this)">Edit</a>
					<a class="dropdown-item" href="#" onclick="deleteCard(this)">Delete</a>
				</div>
			</div>

			<h5 class="card-title">
				<span class="card-icon"></span>
				<span>${cardData.title}</span>
			</h5>

			${cardSearchBox}

			<p class="card-text">${cardData.description}</p>
			<a href="${cardData.buttonUrl}" class="btn btn-primary">${cardData.buttonLabel}</a>
		</div>
	</div>`;
}
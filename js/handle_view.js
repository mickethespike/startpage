'use strict';

/**
 * Appends a new card to a row.
 * @param {HTMLDivElement} row The card row.
 * @param {CardData} cardData The card data.
 * @param {boolean} fade Whether to fade in the card.
 * @returns {HTMLElement} The card element.
 */
function appendCardData(row, cardData, fade) {
	validateCardData(cardData);
	const cardElement = CardElement.fromData(cardData);

	updateCardIcon(cardData, cardElement);
	row.appendChild(cardElement.rootElement);

	if (fade)
		fadeInElement(cardElement.rootElement);
	
	return cardElement;
}

/**
 * Appends a new card to the primary row.
 * @param {CardData} cardData The card data.
 * @param {boolean} fade Whether to fade in the card.
 * @returns {HTMLElement} The card element.
 */
function appendPrimaryCardData(cardData, fade) {
	const row = document.getElementById('primaryRow');
	const element = appendCardData(row, cardData, fade);

	primaryCards.push(cardData);
	return element;
}

/**
 * Appends a new card to the user row.
 * @param {CardData} cardData The card data.
 * @param {boolean} fade Whether to fade in the card.
 * @returns {HTMLElement} The card element.
 */
function appendUserCardData(cardData, fade) {
	const row = document.getElementById('userRow');
	return appendCardData(row, cardData, fade);
}

/**
 * Finds a card node by it's ID.
 * @param {Number} cardId The card ID.
 * @returns {HTMLElement} The card node.
 */
function findCardNodeById(cardId) {
	const container = document.getElementsByClassName("container")[0];
	const rows = container.getElementsByClassName("row");

	// start 'i' at one to skip first row
	for (let i = 1; i < rows.length; i++) {
		for (const node of rows[i].children) {
			const card = node.firstElementChild;
			if (card.attributes[cardIdAttrName].value === cardId)
				return node;
		}
	}
	return null;
}

function editCard(cardId) {
	const modalElement = modalElementInstance;
	const modalData = modalElement.toCardData();

	const cardNode = findCardNodeById(cardId);
	const cardElement = CardElement.wrapNode(cardNode);

	const cardData = findCardDataById(cardId);
	const mergedData = Object.assign(cardData, modalData); // TODO: include custom fields
	validateCardData(mergedData);
	cardElement.assignCardData(mergedData);
	saveCards();

	updateCardIcon(mergedData, cardElement);
}

appendPrimaryCardData({
	id: "primary-YouTube",
	title: "YouTube",
	searchBase: "https://youtube.com/results?search_query=",
	description: "The biggest video sharing platform!",
	buttonUrl: "https://youtube.com",
	buttonLabel: "Get me there!"
}, false);

appendPrimaryCardData({
	id: "primary-GitHub",
	title: "GitHub",
	searchBase: "https://github.com/search?q=",
	description: "The most awesome code sharing platform for lovers of open source.",
	buttonUrl: "https://github.com",
	buttonLabel: "Sounds awesome!"
}, false);
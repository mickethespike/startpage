'use strict';

let currentlyEditedCardId;

/**
 * Appends a new card to a row.
 * @param {HTMLDivElement} row The card row.
 * @param {object} cardData The card data.
 * @param {boolean} fade Whether to fade in the card.
 * @returns {HTMLElement} The card element.
 */
function appendCardData(row, cardData, fade) {
	const node = document.createElement('node');
	node.className = 'col-sm-6';
	node.innerHTML = generateCardHtml(cardData);

	updateCardIcon(cardData, node);
	row.appendChild(node);

	if (fade)
		fadeInElement(node);
	
	return node;
}

/**
 * Appends a new card to the primary row.
 * @param {object} cardData The card data.
 * @param {boolean} fade Whether to fade in the card.
 * @returns {HTMLElement} The card element.
 */
function appendPrimaryCardData(cardData, fade) {
	const row = document.getElementById('primaryRow');
	return appendCardData(row, cardData, fade);
}

/**
 * Appends a new card to the user row.
 * @param {object} cardData The card data.
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
			if (card.attributes["data-id"].value === cardId)
				return node;
		}
	}
	return null;
}

function editCard(cardId) {
	const cardData = findCardData(cardId);

	const title = document.getElementById('card_title').value;
	cardData.title = title;
	cardData.description = document.getElementById('description').value,
	cardData.buttonUrl = document.getElementById('button_url').value;
	cardData.buttonLabel = document.getElementById('button_label').value;

	validateCardData(cardData);
	saveCards();

	const node = findCardNodeById(cardId);
	node.innerHTML = generateCardHtml(cardData);
	updateCardIcon(cardData, node);
}

function setModalMode(modeName, methodName) {
	const modal = $('#editModal')['0'];
	modal.querySelector('.modal-title').innerHTML = `${modeName} Card`;
	
	const button = modal.querySelector('.modal-footer').querySelector('.btn');
	button.innerHTML = modeName;
	button.setAttribute('onclick', `${methodName}()`);
}

appendPrimaryCardData({
	title: "YouTube",
	searchBase: "https://youtube.com/results?search_query=",
	searchPlaceholder: "Search YouTube",
	description: "The biggest video sharing platform!",
	buttonUrl: "https://youtube.com",
	buttonLabel: "Get me there!"
}, false);

appendPrimaryCardData({
	title: "GitHub",
	searchBase: "https://github.com/search?q=",
	searchPlaceholder: "Search GitHub",
	description: "The most awesome code sharing platform for lovers of open source.",
	buttonUrl: "https://github.com",
	buttonLabel: "Sounds awesome!"
}, false);
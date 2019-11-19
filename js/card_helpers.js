
function createCardId(title) {
	const salt = Math.round(Math.random() * 100000);
	const safeTitle = title ? title.replace(" ", "_") : "";
	return safeTitle + "_" + salt;
}

function findCardIndexById(cardId) {
	for (let i = 0; i < userCards.length; i++) {
		if (userCards[i].id === cardId)
			return i;
	}
	return -1;
}

function findCardDataById(cardId) {
	const cardIndex = findCardIndexById(cardId);
	if (cardIndex !== -1)
		return userCards[cardIndex];
	return null;
}

/**
 * Tries to find a card ID attribute by looking for a card ID attribute at parent elements.
 * @param {HTMLElement} node The card element.
 * @returns {Attr} The card ID attribute.
 */
function findCardIdByParent(node) {
	if (!node)
		return null;

	while (!node.hasAttribute(cardIdAttrName)) {
		if (node instanceof HTMLBodyElement)
			return null;
		node = node.parentElement;

		if (!node)
			return null;
	}
	return node.getAttributeNode(cardIdAttrName);
}

function invokeDOMEvent(eventName, element) {
	const event = new Event(eventName);
	element.dispatchEvent(event);
}

class DataProperty {

	/**
	 * 
	 * @param {Node} node The node.
	 */
	constructor(node) {
		this.node = node;
		this._isInput =
			this.node instanceof HTMLInputElement ||
			this.node instanceof HTMLTextAreaElement;

		this.onset = null;
	}

	get() {
		if (this._isInput)
			return this.node.value;
		return this.node.textContent;
	}

	set(value) {
		if (!value)
			value = null;

		if (this._isInput)
			this.node.value = value;
		else
			this.node.textContent = value;

		if (this.onset)
			this.onset(this);
	}

	clear() {
		this.set(null);
	}
}


function createCardId(title) {
	const salt = Math.round(Math.random() * 100000);
	const safeTitle = title.replace(" ", "_");
	return safeTitle + "_" + salt;
}

function findCardIndexById(cardId) {
	for (let i = 0; i < userCards.length; i++) {
		if (userCards[i].id === cardId)
			return i;
	}
	return -1;
}

function findCardData(cardId) {
	const cardIndex = findCardIndexById(cardId);
	if (cardIndex !== -1)
		return userCards[cardIndex];
	return null;
}

function findCardIdByNode(node) {
	while (!node.hasAttribute("data-id")) {
		if (node instanceof HTMLBodyElement)
			return null;
		node = node.parentElement;
	}

	if (node.hasAttribute("data-id"))
		return node.attributes["data-id"].value;
	return null;
}

function startEditingCard(sender) {
	$('#editModal').modal();
	setModalMode('Edit', 'stopEditingCard');

	const cardId = findCardIdByNode(sender);
	currentlyEditedCardId = cardId;
}

function deleteCard(sender) {
	const cardId = findCardIdByNode(sender);
	const cardIndex = findCardIndexById(cardId);
	if (cardIndex !== -1) {
		userCards.splice(cardIndex, 1);
		saveCards();

		const cardNode = findCardNodeById(cardId);
		fadeOutAndRemove(cardNode);
		return true;
	}
	return false;
}


function stopEditingCard() {
	editCard(currentlyEditedCardId);

	currentlyEditedCardId = null;
}

function addCard() {
	const title = document.getElementById('card_title').value;
	const cardData = {
		title: title,
		id: createCardId(title),
		description: document.getElementById('description').value,
		buttonUrl: document.getElementById('button_url').value,
		buttonLabel: document.getElementById('button_label').value
	};

	userCards.push(cardData);
	saveCards();

	appendUserCardData(cardData);
}
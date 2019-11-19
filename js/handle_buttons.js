
let shouldClearModal = false;

function startEditingCard(sender) {
	$('#editModal').modal();
	setModalMode('Edit', 'finishEditingCard');

	const cardId = findCardIdByParent(sender).value;
	currentlyEditedCardId.value = cardId;

	const cardElement = modalElementInstance;
	const cardData = findCardDataById(cardId);
	cardElement.assignCardData(cardData);

	shouldClearModal = true;
}

function finishEditingCard() {
	editCard(currentlyEditedCardId.value);
	currentlyEditedCardId.value = null;
}

function startAddingCard() {
	setModalMode('Add', 'finishAddingCard');

	if (shouldClearModal) {
		shouldClearModal = false;
		modalElementInstance.assignCardData(new CardData());
	}
}

function finishAddingCard() {
	const cardData = modalElementInstance.toCardData();
	validateCardData(cardData);

	userCards.push(cardData);
	saveCards();

	appendUserCardData(cardData);
}

function setModalMode(modeName, methodName) {
	const modal = $('#editModal')['0'];
	modal.querySelector('.modal-title').innerHTML = `${modeName} Card`;

	const button = modal.querySelector('.modal-footer').querySelector('.btn');
	button.innerHTML = modeName;
	button.setAttribute('onclick', `${methodName}()`);
}

function deleteCard(sender) {
	const cardId = findCardIdByParent(sender).value;
	const cardIndex = findCardIndexById(cardId);
	if (cardIndex !== -1) {
		userCards.splice(cardIndex, 1);
		saveCards();

		const cardNode = findCardNodeById(cardId);
		fadeOutAndRemoveElement(cardNode);
		return true;
	}
	return false;
}

buttonUrlInputElement.onchange = () => stylizeButtonUrlInputElement();
buttonUrlInputElement.oninput = () => stylizeButtonUrlInputElement();

function stylizeButtonUrlInputElement() {
	const url = modalElementInstance.buttonUrl.get();

	buttonUrlInputElement.style.color = null;
	if (url && !validateButtonUrl(url, false)) {
		buttonUrlInputElement.style.color = "red";
	}
}
'use strict';

const cardDataKey = 'data';
let userCards;
let cardRow;
let currentlyEditedCard;

window.onload = () => {
    userCards = loadCards(cardDataKey);
};

function getCardRow() {
    if (!cardRow)
        cardRow = document.getElementById('secondaryRow');
    return cardRow;
}

function appendCard(cardData) {
	const node = createCardNode(cardData);
	node.innerHTML = getCardHTML(cardData);

    getCardRow().appendChild(node);
    fadeIn(node);
}

function getCardNode(cardId) {
	const container = document.getElementsByClassName("container")[0];
	const rows = container.getElementsByClassName("row");
    for (let i = 1; i < rows.length; i++) { // start at one to skip first row
        for (const node of rows[i].children) {
            if (node.id === cardId)
                return node;
        }
    }
}

function loadCards() {
    // set data to the saved array, if there wasn't saved data then it'll return an empty array
    const items = localStorage.getItem(cardDataKey)
        ? JSON.parse(localStorage.getItem(cardDataKey))
        : [];

    for (let i = 0; i < items.length; i++) {
        appendCard(items[i]);
    }
    return items;
}

function saveCards() {
    localStorage.setItem(cardDataKey, JSON.stringify(userCards));
}

function createCardId(title) {
	const salt = Math.round(Math.random() * 100_000);
	const safeTitle = title.replace(".", "_").replace(" ", "_");
	return safeTitle + "_" + salt;
}

function addCard() {
	const title = document.getElementById('card_title').value;
    const data = {
        title: title,
        id: createCardId(title),
        description: document.getElementById('description').value,
        url: document.getElementById('url').value,
        buttonLabel: document.getElementById('button_label').value
    };

    userCards.push(data);
    saveCards();
    appendCard(data);
}

function findCardIndex(cardId) {
	for (let i = 0; i < userCards.length; i++) {
		if (userCards[i].id === cardId)
			return i;
	}
	return -1;
}

function findCardData(cardId) {
	const cardIndex = findCardIndex(cardId);
	if (cardIndex !== -1)
		return userCards[cardIndex];
	return null;
}

function deleteCard(cardId) {
	const cardIndex = findCardIndex(cardId);
	if (cardIndex !== -1) {
		userCards.splice(cardIndex, 1);
		saveCards();

		fadeOutAndRemove(document.getElementById(cardId));
		return true;
	}
	return false;
}

function editCard(cardId) {
	const cardData = findCardData(cardId);

    const title = document.getElementById('card_title').value;
    cardData.title = title;
    cardData.description = document.getElementById('description').value,
    cardData.url = document.getElementById('url').value;
    cardData.buttonLabel = document.getElementById('button_label').value;

	saveCards();

	const node = getCardNode(cardId);
	node.innerHTML = getCardHTML(cardData);
}

function setModalMode(modeName, methodName) {
  const modal = $('#editModal')['0'];
	modal.querySelector('.modal-title').innerHTML = `${modeName} Card`;

  const button = modal.querySelector('.modal-footer').querySelector('.btn');
  button.innerHTML = modeName;
  button.setAttribute('onclick', `${methodName}()`);
  console.log(modeName);
}

function startEditingCard(cardId) {
    $('#editModal').modal();
    setModalMode('Edit', 'stopEditingCard');

    currentlyEditedCard = cardId;
}

function stopEditingCard() {
    editCard(currentlyEditedCard);

    currentlyEditedCard = null;
}

function createCardNode(cardData) {
    const node = document.createElement('node');
    node.className = 'col-sm-6';
    node.id = cardData.id;
    node.style = "opacity: 0;";

    let iconUrl;
    if (cardData.customIcon) {
        iconUrl = cardData.customIcon;
    } else {
        iconUrl = "https://" + cardData.url.split("/")[2];
        if (!iconUrl.endsWith('/'))
            iconUrl += '/';
        iconUrl += 'favicon.ico';
    }

    return node;
}

function getCardHTML(cardData) {
	let cardIconHtml = cardData.iconUrl
		? `<img class="previewIcon" src="${cardData.iconUrl}" width="24" height="24" />`
		: "";
	
	return `
        <div class="card">
	       	<div class="card-body">
	       		<div class="dropdown">
	       			<button type="button" class="dropdown-toggle card-settings fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
	       			<div class="dropdown-menu">
	       				<a class="dropdown-item" href="#" onclick="startEditingCard('${cardData.id}')">Edit</a>
	       				<a class="dropdown-item" href="#" onclick="deleteCard('${cardData.id}')">Delete</a>
	       			</div>
	       		</div>
	       		<h5 class="card-title">
					<div class="card-icon">
						${cardIconHtml}
					</div>
                    ${cardData.title}
                </h5>
	       		<p class="card-text">${cardData.description}</p>
	       		<a href="${cardData.url}" class="btn btn-primary">${cardData.buttonLabel}</a>
	       	</div>
	    </div>`;
}
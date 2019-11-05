'use strict';

const cardDataKey = 'data';
let cardArray;
let cardRow;

window.onload = () => {
    cardArray = loadCards(cardDataKey);
};

function getCardRow() {
    if (!cardRow)
        cardRow = document.getElementById('secondaryRow');
    return cardRow;
}

function appendCard(data) {
    const child = getCardDiv(data);
    getCardRow().appendChild(child);
    fadeIn(child);
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
    localStorage.setItem(cardDataKey, JSON.stringify(cardArray));
}

function addCard() {
    const data = {
        title: document.getElementById('card_title').value,
        id: Math.round(Math.random() * 100_000),
        description: document.getElementById('description').value,
        url: document.getElementById('url').value,
        buttonLabel: document.getElementById('button_label').value
    };

    cardArray.push(data);
    saveCards();
    appendCard(data);
}

function findCardIndex(cardId) {
	for (let i = 0; i < cardArray.length; i++) {
		if (cardArray[i].id === cardId) {
			return i;
		}
	}
	return -1;
}

function findCardData(cardId) {
	const cardIndex = findCardIndex(cardId);
	if (cardIndex !== -1)
		return findCardData(cardIndex);
	return null;
}

function deleteCard(cardId) {
	const cardIndex = findCardIndex(cardId);
	if (cardIndex !== -1) {
		cardArray.splice(cardIndex, 1);
		saveCards();
		fadeOutAndRemove(document.getElementById(cardId));
		return true;
	}
	return false;
}

function editCard(cardId) {
    $('#editModal').modal();
    setModalMode('Edit');
}

function setModalMode(modeName) {
    const modal = $('#editModal')['0'];
	modal.querySelector('.modal-title').innerHTML = `${modeName} Card`;

    const button = modal.querySelector('.modal-footer').querySelector('.btn');
    button.innerHTML = modeName;
    button.setAttribute('onclick', `${modeName.toLowerCase()}Card()`);
    console.log(modeName);
}

function getCardDiv(cardData) {
    const div = document.createElement('node');
    div.className = 'col-sm-6';
    div.id = cardData.id;
    div.style = "opacity: 0;";

    let iconUrl;
    if (cardData.customIcon) {
        iconUrl = cardData.customIcon;
    } else {
        iconUrl = "https://" + cardData.url.split("/")[2];
        if (!iconUrl.endsWith('/'))
            iconUrl += '/';
        iconUrl += 'favicon.ico';
    }

    div.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="dropdown">
                    <button type="button" class="dropdown-toggle card-settings fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" onclick="editCard('${cardData.id}')">Edit</a>
                        <a class="dropdown-item" href="#" onclick="deleteCard('${cardData.id}')">Delete</a>
                    </div>
                </div>
                <h5 class="card-title">
                    <img class="previewIcon" src="${iconUrl}" width="24" height="24" />
                    ${cardData.title}
                </h5>
                <p class="card-text">${cardData.description}</p>
                <a href="${cardData.url}" class="btn btn-primary">${cardData.buttonLabel}</a>
            </div>
        </div>`;
    return div;
}
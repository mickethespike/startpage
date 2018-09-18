'use strict';

const cardDataKey = 'data';
let cardArray;
let cardRow;

window.onload = () => {
    cardArray = loadCards(cardDataKey);
};

function getCardRow() {
    if (!cardRow)
        cardRow = document.getElementsByClassName('row')[1];
    return cardRow;
}

function loadCards() {
    // set data to the saved array, if there wasn't saved data then it'll return an empty array
    const items = localStorage.getItem(cardDataKey) ?
        JSON.parse(localStorage.getItem(cardDataKey)) : [];

    for (let i = 0; i < items.length; i++) {
        getCardRow().innerHTML += getHtml(items[i]);
    }
    return items;
}

function saveCards() {
    localStorage.setItem(cardDataKey, JSON.stringify(cardArray));
}

function addCard() {
    const title = document.getElementById('card_title').value;
	const data = {
        title: title,
        id: title.replace('.', '_').replace(' ', '_'),
		description: document.getElementById('description').value,
		url: document.getElementById('url').value,
		buttonLabel: document.getElementById('button_label').value
    };

    cardArray.push(data);
    saveCards();
    getCardRow().innerHTML += getHtml(data);
}

function deleteCard(cardID) {
    for (let i = 0; i < cardArray.length; i++) {
        if (cardArray[i].id === cardID) {
            cardArray.splice(i, 1);
            saveCards();
            break;
        }
    }
    document.getElementById(cardID).remove(0);
}

function getHtml(cardData) {
    return `
    <div class="col-sm-6" id="${cardData.id}">
		<div class="card">
			<div class="card-body">
				<div class="dropdown">
					<button type="button" class="dropdown-toggle card-settings fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
					<div class="dropdown-menu">
						<a class="dropdown-item" href="#" onclick="deleteCard('${cardData.id}')">Delete</a>
					</div>
				</div>
				<h5 class="card-title">${cardData.title}</h5>
				<p class="card-text">${cardData.description}</p>
				<a href="${cardData.url}" class="btn btn-primary">${cardData.buttonLabel}</a>
			</div>
		</div>
	</div>`;
}

const cardDataKey = 'savedUserCards';

let fakeLocalStorage;
var userCards;

function loadSavedState() {
	userCards = loadSavedCards();
}

function loadSavedCards() {
	// set data to the saved array,
	// if there wasn't saved data then it'll return an empty array
	const items = getLocalStorage().getItem(cardDataKey)
		? JSON.parse(getLocalStorage().getItem(cardDataKey))
		: [];

	for (let i = 0; i < items.length; i++) {
		appendUserCardData(items[i], true);
	}
	return items;
}

function saveCards() {
	getLocalStorage().setItem(cardDataKey, JSON.stringify(userCards));
}

function getLocalBool(key) {
	return getLocalStorage().getItem(key) === 'true';
}

function getLocalStorage() {
	try {
		if (localStorage)
			return localStorage;
	}
	catch (err) {
		if (!fakeLocalStorage)
			console.warn("Failed to get local storage.", err);
	}

	if (!fakeLocalStorage) {
		fakeLocalStorage = {};
		fakeLocalStorage.getItem = () => null;
		fakeLocalStorage.setItem = () => null;

		alert("Failed to access local storage, cards won't be saved.");
	}
	return fakeLocalStorage;
}
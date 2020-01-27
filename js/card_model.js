
const cardIdAttrName = "data-card-id";

const cardModalBody = document.getElementById("settings-modal-body");
cardModalBody.setAttribute(cardIdAttrName, null);
const currentlyEditedCardId = cardModalBody.getAttributeNode(cardIdAttrName);

const titleInputElement = document.getElementById("card_title");
const descriptionInputElement = document.getElementById("description");
const buttonUrlInputElement = document.getElementById("button_url");
const buttonLabelInputElement = document.getElementById("button_label");

class CardData {
	// TODO:
	//  * add search-related fields like 'searchBase',
	//  * add a 'customIconUrl' picker in the card modal    

	constructor() {
		this.id = "";
		this.title = "";
		this.description = "";
		this.buttonUrl = "";
		this.buttonLabel = "";

		this.customIconUrl = "";
	}
}

class CardElement {

	/**
	 * Constructs an empty card element.
	 * @param {HTMLElement} rootElement The card root.
	 * @param {DataProperty} id The ID node.
	 * @param {DataProperty} title The title element.
	 * @param {DataProperty} description The description element.
	 * @param {DataProperty} buttonUrl The button URL element.
	 * @param {DataProperty} buttonLabel The button label node.
	 * @param {HTMLSpanElement} iconElement The icon element.
	 */
	constructor(
		rootElement,
		id,
		title,
		description,
		buttonUrl,
		buttonLabel,
		iconElement) {

		this.rootElement = rootElement;
		this.id = id;
		this.title = title;
		this.description = description;
		this.buttonUrl = buttonUrl;
		this.buttonLabel = buttonLabel;
		this.iconElement = iconElement;
	}

	/**
	 * Creates a card data object from this element's data.
	 * @returns {CardData} The card data.
	 * */
	toCardData() {
		const data = new CardData();
		data.id = this.id.get();
		data.title = this.title.get();
		data.description = this.description.get();
		data.buttonUrl = this.buttonUrl.get();
		data.buttonLabel = this.buttonLabel.get();
		return data;
	}

	/**
	 * Assigns card data to the card element.
	 * Does not assign ID.
	 * @param {CardData} cardData The card data.
	 */
	assignCardData(cardData) {
		this.title.set(cardData.title);
		this.description.set(cardData.description);
		this.buttonUrl.set(cardData.buttonUrl);
		this.buttonLabel.set(cardData.buttonLabel);
	}

	/**
	 * Constructs the card element from an existing node.
	 * @param {HTMLElement} node The card node.
	 * @returns {CardElement} The card element.
	 */
	static wrapNode(node) {
		const cardElement = node.getElementsByClassName("card")[0];
		const headerElement = cardElement.getElementsByClassName("card-title")[0];

		const cardIdAttr = cardElement.getAttributeNode(cardIdAttrName);
		const titleSpan = headerElement.getElementsByTagName("span")[1];
		const descriptionSpan = cardElement.getElementsByClassName("card-text")[0];
		const button = cardElement.getElementsByClassName("btn btn-primary")[0];
		const buttonUrl = button.getAttributeNode("href");
		const iconSpan = headerElement.getElementsByTagName("span")[0];

		return new CardElement(
			node,
			new DataProperty(cardIdAttr),
			new DataProperty(titleSpan),
			new DataProperty(descriptionSpan),
			new DataProperty(buttonUrl),
			new DataProperty(button),
			iconSpan);
	}

	/**
	 * Constructs the card element from data.
	 * @param {CardData} cardData The card data.
	 * @returns {CardElement} The card element.
	 */
	static fromData(cardData) {
		const node = document.createElement("node");
		node.classList.add("col-sm-6");
		node.innerHTML = generateCardHtml(cardData);

		return CardElement.wrapNode(node);
	}

	/**
	 * Constructs the card element from the card modal.
	 * @returns {CardElement} The card element.
	 */
	static wrapModal() {
		const element = new CardElement(
			null,
			new DataProperty(currentlyEditedCardId),
			new DataProperty(titleInputElement),
			new DataProperty(descriptionInputElement),
			new DataProperty(buttonUrlInputElement),
			new DataProperty(buttonLabelInputElement),
			null);

		element.buttonUrl.onset = (e) => invokeDOMEvent("change", e.node);
		return element;
	}
}

// instead of a static field on CardElement,
// static fields are apparently not standardized yet
const modalElementInstance = CardElement.wrapModal();

/**
 * Validates card data. Possible fixes;
 *  * adding a protocol to the button URL.
 * @param {CardData} cardData The card data.
 * @returns {boolean} Whether the card data was valid.
 */
function validateCardData(cardData) {
	let isValid = true;

	const validatedButtonUrl = validateButtonUrl(cardData.buttonUrl, true);
	if (!validatedButtonUrl) {
		delete cardData.buttonUrl;
		isValid = false;
	}
	else {
		cardData.buttonUrl = validatedButtonUrl;
	}

	if (!cardData.searchButtonLabel)
		cardData.searchButtonLabel = "Search";

	if (!cardData.searchPlaceholder)
		cardData.searchPlaceholder = "Search " + cardData.title;

	// add more validation code here
	return isValid;
}

function validateButtonUrl(buttonUrl, logError) {
	try {
		if (typeof buttonUrl === "string") {
			if (!buttonUrl.startsWith("https://") &&
				!buttonUrl.startsWith("http://"))
				buttonUrl = "https://" + buttonUrl;
			buttonUrl = new URL(buttonUrl);
		} else if (buttonUrl && !(buttonUrl instanceof URL)) {
			throw new Error();
		}
	}
	catch (e) {
		if (logError)
			console.warn("Validation of button URL failed:", buttonUrl, e);
		return null;
	}
	return buttonUrl;
}

/**
 * Updates the card's icon.
 * This function exists as icons can be requested asynchrounsly after a card's HTML is created.
 * @param {CardData} cardData The card data.
 * @param {CardElement} cardElement The card to update.
 */
function updateCardIcon(cardData, cardElement) {
	if (cardData.customIconUrl) {
		cardElement.iconElement.innerHTML = generateCardIconHtml(cardData.customIconUrl);
	}
	else {
		sendFaviconRequest(cardData.buttonUrl).then((iconUrl) => {
			if (iconUrl)
				cardElement.iconElement.innerHTML = generateCardIconHtml(iconUrl);
		}).catch();
	}
}

function generateCardIconHtml(url) {
	return `<img class="previewIcon" src="${url}" width="24" height="24" />`;
}

/**
 * Generates HTML for a card.
 * This method does not reserve an <img> for the card icon, use "updateCardIcon" after card creation.
 * @param {any} cardData The card data.
 * @returns {string} The generated card HTML.
 */
function generateCardHtml(cardData) {
	let cardSearchBox = "";
	if (cardData.searchBase) {
		cardSearchBox = `
		<div class="input-group mb-3" searchbase="${cardData.searchBase}">
			<input type="text" class="form-control" placeholder="${cardData.searchPlaceholder}" onkeypress="actionOnEnter(event)">
			<div class="input-group-append" onclick="buttonQuerySite(this)">
				<button class="btn btn-outline-secondary" tabIndex="-1" type="button">${cardData.searchButtonLabel}</button>
			</div>
		</div>`;
	}

	const buttonHref = cardData.buttonUrl ? cardData.buttonUrl : "";

	return `
	<div class="card" ${cardIdAttrName}=${cardData.id}>
		<div class="card-body">
			<div class="dropdown">
				<button type="button" class="dropdown-toggle card-settings fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="#" onclick="startEditingCard(this)">Edit</a>
					<a class="dropdown-item" href="#" onclick="deleteCard(this)">Delete</a>
				</div>
			</div>

			<h5 class="card-title">
				<span class="card-icon"></span>
				<span>${cardData.title}</span>
			</h5>

			${cardSearchBox}

			<p class="card-text">${cardData.description}</p>
			<a href="${buttonHref}" class="btn btn-primary">${cardData.buttonLabel}</a>
		</div>
	</div>`;
}
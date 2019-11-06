
class CardEditModel {
	get title() {
		return this.titleSpan.innerHTML;
	}

	get id() {

	}

	static fromHtmlElement(element) {
		const model = new CardEditModel();
		model.titleDiv = element.getElementsByClassName("card-title")[0];
		model.iconDiv = model.titleDiv.getElementsByTagName("div")[0];
		model.titleSpan = model.titleDiv.getElementsByTagName("span")[0];

		//model.
		return model;
	}
}

function generateCardIconHtml(url) {
	return `<img class="previewIcon" src="${url}" width="24" height="24" />`;
}

function generateCardHtml(cardData) {
	let cardIconHtml = cardData.customIconUrl ? generateCardHtml(cardData.customIconUrl) : "";

	let cardSearchBox = "";
	if (cardData.searchBase) {
		cardSearchBox = `
		<div class="input-group mb-3" searchbase="${cardData.searchBase}">
			<input type="text" class="form-control" id="searchgithub" placeholder="${cardData.searchPlaceholder}" aria-label="${cardData.searchButtonLabel}" aria-describedby="basic-addon2" onkeypress="actionOnEnter(event)">
			<div class="input-group-append" onclick="buttonQuerySite(this)">
				<button class="btn btn-outline-secondary" tabIndex="-1" type="button">Search</button>
			</div>
		</div>`;
	}

	return `
	<div class="card" data-id=${cardData.id}>
		<div class="card-body">
			<div class="dropdown">
				<button type="button" class="dropdown-toggle card-settings fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="#" onclick="startEditingCard(this)">Edit</a>
					<a class="dropdown-item" href="#" onclick="deleteCard(this)">Delete</a>
				</div>
			</div>

			<h5 class="card-title">
				<span class="card-icon">${cardIconHtml}</span>
				<span>${cardData.title}</span>
			</h5>

			${cardSearchBox}

			<p class="card-text">${cardData.description}</p>
			<a href="${cardData.buttonUrl}" class="btn btn-primary">${cardData.buttonLabel}</a>
		</div>
	</div>`;
}
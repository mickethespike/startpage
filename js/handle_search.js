function querySite(input) {
	const searchBase = input.parentElement.getAttribute('searchbase');
	document.location.href = searchBase + input.value;
}

function buttonQuerySite(button) {
	querySite(button.parentElement.querySelector('input[type=text]'));
}

function actionOnEnter(event) {
	if(event.keyCode === 13) {
		querySite(event.srcElement);
	}
}
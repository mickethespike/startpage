function switchSite(website) {
	document.location.href = website;
}

function querySite(baseUrl, query) {
	switchSite(baseUrl + query);	
}

function buttonToInputValue(button) {
	return button.parentElement.querySelector('input[type=text]').value;
}

function queryDuckduckgo(query) {
	querySite('https://duckduckgo.com/&q=', query);
}

function queryYoutube(query) {
	querySite('https://www.youtube.com/results?search_query=', query);
}

function queryGithub(query) {
	querySite('https://github.com/search?q=', query);
}
	
function actionOnEnter(event, action) {
	if(event.keyCode == 13) {
		action(event.srcElement.value);
	}
}
function switchSite(website) {
	document.location.href = website;
}

function search(website) {
	let query = '';

	switch (website) {
		case 'ddg':
			query = document.getElementById('searchbar').value;
			switchSite('https://duckduckgo.com/&q=' + query);
			break;
		case 'yt':
			query = document.getElementById('searchyoutube').value;
			switchSite('https://www.youtube.com/results?search_query=' + query);
			break;
		case 'gh':
			query = document.getElementById('searchgithub').value;
			switchSite('https://github.com/search?utf8=%E2%9C%93&q=' + query + '&type=');
			break;
	}
}



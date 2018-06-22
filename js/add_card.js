let cards = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []; //Check if there's an item called data, if it does'n't exist then it'll return an empty array

const add_cards = () => {
	let data = {};
	data['card_title'] = document.getElementById('card_title').value;
	data['description'] = document.getElementById('description').value;
	data['url']	= document.getElementById('url').value;
	data['button_label'] = document.getElementById('button_label').value;

  let html = `
  <div class="col-sm-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">${data['card_title']}</h5>
				<p class="card-text">${data['description']}</p>
				<a href="${data['url']}" class="btn btn-primary">${data['button_label']}</a>
			</div>
		</div>
	</div>`;

	cards.push(data);
	store_array('data', cards);
	document.getElementsByClassName('row')[1].innerHTML += html;
}

const store_array = (keyname, arr) => {
  localStorage.setItem(keyname, JSON.stringify(arr));
}

store_array('data', cards);

const load_data = () => {
  let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []; //here I set data to the saved array, if there wasn't saved data then it'll return an empty array
  //console.log(Boolean(localStorage.getItem('data')));
  for(let i = 0; i < data.length;i++) { //loop into that array
    let keys = Object.keys(data[i]); //Not important but would help you if you added more info

	let html = `
  <div class="col-sm-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">${data[i]['card_title']}</h5>
				<p class="card-text">${data[i]['description']}</p>
				<a href="${data[i]['url']}" class="btn btn-primary">${data[i]['button_label']}</a>
			</div>
		</div>
	</div>`;
  document.getElementsByClassName('row')[1].innerHTML += html;
  }
	//let handler = {'cards_title':'','description':'','url':'','button_label':''};

}

load_data();

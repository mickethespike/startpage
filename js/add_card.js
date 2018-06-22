/* CARD BOILERPLATE
<div class="col-sm-6" id="name_of_card">
  <div class="card">
	  <div class="card-body">
    	<h5 class="card-title">Title</h5>
    	<p class="card-text">Bluh</p>
    	<a href="#" class="btn btn-primary">Button</a>
    </div>
  </div>
</div>
*/

let amount_of_cards = 0;

const initialize_cards = () => {

}

const add_to_storage = (keyName, keyValue) => {
  localStorage.setItem(keyName, JSON.stringify(keyValue));
}

const add_card = () => {
  let card_title = document.getElementById('card_title').value;
  let description = document.getElementById('description').value;
  let url = document.getElementById('url').value;
  let button_label = document.getElementById('button_label').value;

  let properties = [card_title, description, url, button_label];

  add_to_storage(`card${amount_of_cards}`, properties);

  document.getElementsByClassName('row')[1].innerHTML += `
  <div class="col-sm-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">${card_title}</h5>
				<p class="card-text">${description}</p>
				<a href="${url}" class="btn btn-primary">${button_label}</a>
			</div>
		</div>
	</div>`
}

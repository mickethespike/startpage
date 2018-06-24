$(() => {
  mode();
  toggle_coffee();

  $('#toggle-mode').bootstrapToggle({
    on: 'Dark',
    off: 'Light'
  });

  $('#toggle-coffee').bootstrapToggle({
    on: 'Hide',
    off: 'Show'
  });

  $('#toggle-mode').change(() => {
    mode();
  });

  $('#toggle-coffee').change(() => {
    toggle_coffee();
  });
});

const toggle_coffee = () => {
  if ($('#toggle-coffee').prop('checked')) {
    $('#coffee-btn').show();
  } else {
    $('#coffee-btn').hide();
  }
}

const mode = () => {
  // if light mode == true
  if ($('#toggle-mode').prop('checked')) {
    $('link[href="./css/light.css"]').attr('href','./css/dark.css');
  } else {
    $('link[href="./css/dark.css"]').attr('href','./css/light.css');
  }
}

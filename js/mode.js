$(() => {
  mode();

  $('#toggle-mode').bootstrapToggle({
    on: 'Light',
    off: 'Dark'
  });

  $('#toggle-mode').change(() => {
    mode();
  });
});

function mode() {
  // if light mode == true
  if ($('#toggle-mode').prop('checked')) {
    $('link[href="./css/dark.css"]').attr('href','./css/light.css');
  } else {
    $('link[href="./css/light.css"]').attr('href','./css/dark.css');
  }
}

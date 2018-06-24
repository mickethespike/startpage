$(() => {
  mode();

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

  $('#toggle-coffee').bootstrapToggle(() => {
    show_coffee();
  });
});

const show_coffee = () => {
  if ($('#toggle-coffee').prop('checked')) {
	  $('#coffee-btn').innerHTML += `<script type='text/javascript' src='https://ko-fi.com/widgets/widget_2.js'></script><script type='text/javascript'>kofiwidget2.init('Support my coffee addiction', '#337AB7', 'R6R5FE86');kofiwidget2.draw();</script>`;
  } else {
    $('#coffee-btn').remove(1).remove(0);
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

$(function() {
  // Disable for chrome which already supports multiline
  if (! (!!window.chrome && !isOpera)) {
    var style = $('<style>textarea[data-placeholder].active { color: #ccc; }</style>')
    $('html > head').append(style);
    
    $('textarea[placeholder]').each(function(index) {
      var text  = $(this).attr('placeholder');
      var match = /\r|\n/.exec(text);
      
      if (! match)
        return;
      
      $(this).attr('placeholder', '');
      $(this).attr('data-placeholder', text);
      $(this).addClass('active');
      $(this).val(text);
    });
    
    $('textarea[data-placeholder]').on('focus', function() {
      if ($(this).attr('data-placeholder') === $(this).val()) {
        $(this).attr('data-placeholder', $(this).val());
        $(this).val('');
        $(this).removeClass('active');
      }
    });
    
    $('textarea[data-placeholder]').on('blur', function() {
      if ($(this).val() === '') {
        var text = $(this).attr('data-placeholder');
        $(this).val(text);
        $(this).addClass('active');
      }
    });
  }
});
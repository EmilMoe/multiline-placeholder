$(function() {
  var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  
  // Disable for chrome which already supports multiline
  if (! (!!window.chrome && !isOpera)) {
    var style = $('<style>textarea[data-placeholder].active { color: #ccc; }</style>')
    $('html > head').append(style);
    
    var onBlur = function() {
      /* Only display placeholder if there's no text inside */
      if ($(this).val() === '') {
        var text = $(this).attr('data-placeholder');
        $(this).val(text);
        $(this).addClass('active');
      }
    };
    
    $('textarea[placeholder]').each(function(index) {
      var text  = $(this).attr('placeholder');
      var match = /\r|\n/.exec(text);
      
      if (! match)
        return;
      
      $(this).attr('placeholder', '');
      $(this).attr('data-placeholder', text);
      
      onBlur.call(this);
    });
    
    $('textarea[data-placeholder]').on('focus', function() {
      if ($(this).attr('data-placeholder') === $(this).val()) {
        $(this).attr('data-placeholder', $(this).val());
        $(this).val('');
        $(this).removeClass('active');
      }
    });
    
    $('textarea[data-placeholder]').on('blur', onBlur);
  }
});

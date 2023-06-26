
  $('.tool').tooltip({
    position: { my: 'center bottom' , at: 'center top-10' },
    tooltipClass: "myclass",
    disabled: true,
    close: function( event, ui ) { $(this).tooltip('disable'); }
});

$('.tool').on('click', function () {
    $(this).tooltip('enable').tooltip('open');
});
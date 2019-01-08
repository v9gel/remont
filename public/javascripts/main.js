$(document).ready(function() {
    $('#example').DataTable();
} );

//Модальные окна
$('.event-modal').modal({
    allowMultiple: true
});

$('#showmodal').click(function() {
    $('.fullscreen.modal').modal('show');
});

$('.event-modal.info').each(function(idx, elem) {
    $(elem).modal('attach events', '#' + $(elem).attr('data-object'));
});

$('select.dropdown')
  .dropdown()
;
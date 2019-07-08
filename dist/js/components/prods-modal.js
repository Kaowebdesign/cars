$(document).ready(function() {
    if(window.location.hash.toString().indexOf('prods-modal') != -1){
        openPopup(window.location.hash);
    }
    function openPopup(idPopup){
        $.magnificPopup.open({
            items: {
            src: $(idPopup),
            },
            type: 'inline'
        });
    }
})
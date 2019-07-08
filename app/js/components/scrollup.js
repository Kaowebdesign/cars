$(document).ready(function(){
    var upButton= $('#upBtn');
    
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            upButton.fadeIn();
        } else {
            upButton.fadeOut();    
        } 
    });

    upButton.on('click',function(e){
        e.preventDefault();
        $('body,html').animate({scrollTop:0},800);
    })
});
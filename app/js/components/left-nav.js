$(document).ready(function() {
    var body = $('body'),
        openBars = $('#openBars'),
        closeBars = $('#closeBars, .fmenu_block'),
        leftNav = $('.left-nav'),
        backBody = $('#backBody');
    openBars.on('click', function(e) {
        e.preventDefault();
        body.animate({
            left: '250px'
        }, 200);
        leftNav.animate({
            left: '0'
        }, 200);
        backBody.addClass('back-body_active');
    });
    closeBars.on('click', function() {
        body.css({
            left: '0'
        });
        leftNav.css({
            left: '-250px'
        });
        backBody.removeClass('back-body_active');
    });
    $(window).resize(function(){
        if($(window).width()> '768'){
            body.css({
                left: '0'
            });
            leftNav.css({
                left: '-250px'
            });
            backBody.removeClass('back-body_active');
        }
    });
});
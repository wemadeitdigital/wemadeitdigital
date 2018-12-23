$(window).scroll(function() {
    if ($(this).scrollTop() > 50 ) {
        $('.scrolltop:hidden').stop(true, true).fadeIn();
    } else {
        $('.scrolltop').stop(true, true).fadeOut();
    }
});
$(window).on('load', function() {
    // get all <code> elements
    var allCodeBlocksElements = $(".highlighter-rouge > div");

    allCodeBlocksElements.each(function(i) {
        // add different id for each code block
        // target	
        var currentId = "codeblock" + (i + 1);
        $(this).attr('id', currentId);
        //trigger
        var clipButton = '<button data-toggle="tooltip" data-placement="left" title="Copied to Clipboard" class="btn" data-clipboard-target="#' + currentId + '"><img src="https://clipboardjs.com/assets/images/clippy.svg" width="13" alt="Copy to clipboard"></button>';
            $(this).append(clipButton);
    });
    var cb = new Clipboard('.highlighter-rouge .btn');

    cb.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        var codeBlockId = e.trigger.getAttribute("data-clipboard-target");
        $('button[data-clipboard-target="' + codeBlockId + '"]').tooltip("show");
    });
});
$(function(){$(".scroll").click(function(){$("html,body").animate({scrollTop:0},"1000");return false})})
$(document).ready(function(){
    $('.carousel.home').carousel({
        interval: 8000,
        pause: "hover"
    }); 
});

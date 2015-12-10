// dispaly content xml into html page
$( document ).ready(function() {
    
    $.get('/test2', function(data) {
    $(".tester").append(data)
    });
    
    // ref: http://stackoverflow.com/questions/18847432/zoom-body-browser
    $('#big').click(function() {
      window.parent.document.body.style.zoom = +1.1;
    });
    
    $('#med').click(function() {
        window.parent.document.body.style.zoom = +1;
    });
    
    $('#small').click(function() {
        window.parent.document.body.style.zoom = +0.8;
    });

$(function() {

//showing and hiding table me.xml
    $("#click-button").on('click', firstClick)

    function firstClick() {
        $.get('/test', function(data) {
            console.log(data);
            $('#innertarget').append(data);
        });
        $("#click-button").attr("value", "Hide");
        $("#click-button").off('click').on('click', secondClick)
    }

    function secondClick() {
        $('#innertarget').hide();
        $("#click-button").attr("value", "Show");
        $("#click-button").off('click').on('click', thirdClick)
    }
    
    function thirdClick() {
        $('#innertarget').show();
        $("#click-button").attr("value", "Hide");
        $("#click-button").off('click').on('click', secondClick)
    }
});

});

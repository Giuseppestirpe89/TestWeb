// dispaly content xml into html page
$( document ).ready(function() {
    
    $.get('/test2', function(data) {
    $(".tester").append(data)
    });

$(function() {

//showing and hidin table me.xml
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

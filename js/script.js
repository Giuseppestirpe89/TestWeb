$(function() {

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



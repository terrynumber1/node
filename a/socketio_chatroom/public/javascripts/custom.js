$(document).ready(function () {



}); // $(document).ready( function() ) {}


// Functions and Variables =======================================

function loadMasterTape() {

    $.ajax({
        type: 'GET',
        url: 'http://bcceng.turner.com/tv/tvwall5.html',
        dataType: 'html',
        success: function (html) {
            if (html) {
                $('#mastertape').html(html);
            } else {
                window.alert('error');
            }

        }
    });

//    window.alert('sdkfsdfjj');
}

function parse(document) {
    var regList = "";

    $(document).find("count").each(function() {
        regList += $(this).attr('name');
        $("#mastertape").text(regList);
    });

}

function getStatus() {

    $.ajax({
        url: 'http://bcceng/carstatus/carstatus_count.xml',
        dataType: "xml",
        success: parse,
        error: function(){
            alert("Error: Something went wrong");
        }
    });

}
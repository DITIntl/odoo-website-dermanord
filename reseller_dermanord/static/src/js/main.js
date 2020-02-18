$(function() {
    //~ if ($("#reseller_description_div").height() > 300) {
        //~ $("#reseller_description_div").height(300);
        //~ $("#reseller_description_div").find(".read-more").removeClass("hidden");
    //~ }
    $("i#remove_img").click(function(){
        var self = $(this);
        openerp.jsonRpc("/remove_img", "call", {
            'partner_id': self.data("partner_id")
        }).done(function(data){
            if (data) {
                $("img#top_image_show").attr("src", "");
                self.find("input").val('1');
                self.addClass("hidden");
            }
        });
    });

    //~ getLocation(); // removed 2019-08-05
    //~ getClientIP();
});

function reseller_restore_filter() {
    $("#dn_reseller_filter_modal").find(".modal-body").find("input[type=checkbox]").each(
        function() {
            if($(this).is(":checked")) {
                $(this).removeAttr('checked');
            }
        }
    );
}

function getLocation(doneFunction) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {setPosition(position, doneFunction)});
    }
}

function setPosition(position, doneFunction) {
    $("input#pos_lng").val(position.coords.longitude);
    $("input#pos_lat").val(position.coords.latitude);

    openerp.jsonRpc("/website_set_location", "call", {
        'longitude': position.coords.longitude,
        'latitude': position.coords.latitude
    }).done(function(data){
        console.log("Location set.");
        if(doneFunction) {
            doneFunction();
        }
    });
}

$(function() {
    $(".placeholder").click(function() {
        $(this).hide();
        $(this).next().focus();
    });
    $("input[name='search_resellers']").click(function() {
        $(this).prev('.placeholder').hide();
    });
    $("input[name='search_resellers']").blur(function() {
        if($(this).val().length) {
            $(this).prev('.placeholder').hide();
        } else {
            $(this).prev('.placeholder').show();
        }
    });
});

//~ function getClientIP() {
    //~ $.getJSON("https://ipapi.co/json/", function(data) {
        //~ $("input#client_ip").val(data['ip']);
    //~ });
//~ }

//~ var $el, $ps, $up, totalHeight;

//~ $("#reseller_description_div .button").click(function() {

  //~ totalHeight = 0

  //~ $el = $(this);
  //~ $p  = $el.parent();
  //~ $up = $p.parent();
  //~ $ps = $up.find("p:not('.read-more')");

  //~ // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
  //~ $ps.each(function() {
    //~ totalHeight += $(this).outerHeight() + 10; // 10px from each p-tag
  //~ });

  //~ $up
    //~ .css({
      //~ // Set height to prevent instant jumpdown when max height is removed
      //~ "height": $up.height(),
      //~ "max-height": 9999
    //~ })
    //~ .animate({
      //~ "height": totalHeight
    //~ });

  //~ // fade out read-more
  //~ $p.fadeOut();

  //~ // prevent jump-down
  //~ return false;

//~ });

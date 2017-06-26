var search_icron = $("#search-btn-modal").closest("li");
var shop_cart = $("a[href='/shop/cart']").closest("li");
var divider = $(".divider").closest("li");
var my_account = $(".dropdown-menu.js_usermenu").closest("li");
var more_menu = $("li#more_dropdown");
var menu_items = [];
var more_menu_items = [];
$("#top_menu").children().each(function() {
    if($(this).attr("id") == "fts_search_btn")
        return false;
    else if($(this).attr("class") == "hidden-xs")
        return false;
    else if($(this).attr("class") == "divider")
        return false;
    else if($(this).attr("id") != "more_dropdown")
        menu_items.push($(this));
});
$("#more_dropdown").find("ul").children().each(function() {
    more_menu_items.push($(this));
});

var li_width_init = search_icron.width() + shop_cart.width() + divider.width() + my_account.width() + 40; // extra pixels to avoid change row
if(menu_items.length == 0) {
    more_menu.addClass("hidden");
}
else if(menu_items.length != 0) {
    more_menu.removeClass("hidden");
    li_width_init += more_menu.width();
}

jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

$(document).ready(function() {
    $("#search-btn").click(function(){ $("#search_input").toggle(); });
    if($(window).width() > 758) {
        var max_li_width = $("#top_menu").width() - li_width_init;
        var li_width = 0;
        $.each(menu_items, function(index) {
            li_width += $(this).width();
            if (li_width > max_li_width) {
                $(this).css({"display": "none"});
            }
            else {
                more_menu_items[index].css({"display": "none"});
            }
        });
    }
    var brand = $('*:contains("MARIA ÅKERBERG")');
    brand.each(function(index) {
        if ($(brand[index]).is("h1, h2, h3, h4, h5, h6, p, a, strong, b, u, mark, small")) {
            var brand_text = brand[index].innerHTML.replace(/MARIA ÅKERBERG/g, "MARIA&#160;ÅKERBERG");
            $(brand[index]).html(brand_text);
        }
    });
});

$(window).resize(function() {
    if($(window).width() > 758) {
        var max_li_width = $("#top_menu").width() - li_width_init;
        var li_width = 0;
        $.each(menu_items, function(index) {
            li_width += $(this).width();
            if (li_width > max_li_width) {
                $(this).css({"display": "none"});
                more_menu_items[index].css({"display": "inline"});
            }
            else {
                $(this).css({"display": "inline"});
                more_menu_items[index].css({"display": "none"});
            }
        });
    }
    else {
        $.each(menu_items, function(index) {
            $(this).css({"display": "inline"});
        });
    }
});


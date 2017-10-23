$(document).ready(function(){
    'use strict';
    $("input[name=search]").keyup(function(){
        openerp.jsonRpc("/search_suggestion", "call", {
            search: $(this).val(),
            res_model: ['product.template', 'product.product', 'product.public.category', 'blog.post', 'product.facet.line'],
            limit: 5,
            offset: 0
        }).done(function(data){
            console.log(data);
            content_front = '<div class="result_suggestion">';
            content_behind = '</div>';
            content = '';
            $.each(data, function(key, info) {
                if (data[key]['model_record'] == 'product.template'){
                    c = '<li><a href="/dn_shop/product/' + data[key]['res_id'] + '">' + data[key]['name'] + '</a></li>';
                    content += c;
                }
                else if (data[key]['model_record'] == 'product.product'){
                    c = '<li><a href="/dn_shop/product/' + data[key]['product_tmpl_id'] + '">' + data[key]['name'] + '</a></li>';
                    content += c;
                }
                else if (data[key]['model_record'] == 'product.public.category'){
                    c = '<li><a href="/dn_shop/category/' + data[key]['res_id'] + '">' + data[key]['name'] + '</a></li>';
                    content += c;
                }
                else if (data[key]['model_record'] == 'blog.post'){
                    c = '<li><a href="/blog/' + data[key]['blog_id'] + '/post/' + data[key]['res_id'] + '">' + data[key]['name'] + '</a></li>';
                    content += c;
                }
                else if (data[key]['model_record'] == 'product.facet.line'){
                    c = '<li><a href="/dn_shop/product/' + data[key]['product_tmpl_id'] + '">' + data[key]['product_name'] + '</a></li>';
                    content += c;
                }
            });
            $(".result_suggestion").html(content_front + content + content_behind)
        });
    });
});

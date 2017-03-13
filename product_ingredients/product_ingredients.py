# -*- coding: utf-8 -*-
##############################################################################
#
# OpenERP, Open Source Management Solution, third party addon
# Copyright (C) 2004-2017 Vertel AB (<http://vertel.se>).
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from openerp import models, fields, api, http, _
from openerp.http import request
import logging
_logger = logging.getLogger(__name__)

#~ class website(models.Model):
    #~ _inherit = 'website'

    #~ @api.model
    #~ def get_id_from_url(self, url):
        #~ _logger.warn('Haojun')
        #~ pass



class WebsiteIngredients(http.Controller):

    @http.route(['/ingredient', '/ingredient/<model("product.ingredient"):ingredient>',], type='http', auth="public", website=True)
    def repord(self, ingredient=None, **post):
        return request.website.render("product_ingredients.page", {'ingredient': ingredient})

class ProductProduct(models.Model):
    _inherit = 'product.product'

    ingredient_ids = fields.Many2many(comodel_name='product.ingredient')

class ProductIngredients(models.Model):
    _name = 'product.ingredient'

    name = fields.Char(string="Name")
    description = fields.Html(string="Description")
    image = fields.Binary(string='Image',)
    product_ids = fields.One2many(comodel_name='product.product')
    sequence = fields.Integer()
    

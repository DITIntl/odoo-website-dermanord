# -*- coding: utf-8 -*-
##############################################################################
#
# OpenERP, Open Source Management Solution, third party addon
# Copyright (C) 2004-2015 Vertel AB (<http://vertel.se>).
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
import base64

import werkzeug
import werkzeug.urls

from openerp import http
from openerp.http import request
from openerp.tools.translate import _

import logging
_logger = logging.getLogger(__name__)

class ContactUs(http.Controller):

    @http.route(['/theme_dermanord/contact_mail'], method='POST', auth='public', website=True)
    def send_mail(self, **post):
        subject = ""
        body = ""
        mail = ""

        if ((post['case']) == 'Web support'):
            mail = "support@dermanord.se"
        elif ((post['case']) == 'Orders'):
            mail = "sales@dermanord.se"
        elif ((post['case']) == 'Become a reseller'):
            mail = "support@dermanord.se"
        elif((post['case']) == 'Finance'):
            mail = "invoice@dermanord.se"
        elif((post['case']) == 'Career'):
            mail = "job@dermanord.se"
        elif((post['case']) == 'Press'):
            mail = "press@dermanord.se"
        elif((post['case']) == 'Complaints'):
            mail = "claims@dermanord.se"
        elif((post['case']) == 'Hints and advices'):
            mail = "support@dermanord.se"
        elif((post['case']) == 'Miscellaneous'):
            mail = "info@dermanord.se"

        mail = request.env['mail.mail'].sudo().create({
            'subject': post['name'],
            'body_html':    u'Kontaktperson: %s\nTelefon: %s\nE-post: %s\nFråga: %s' % (post['contact_name'], post['phone'], post['email_from'], post['description']),
            'email_from': post['email_from'],
            'type': 'email',
            'auto_delete': True,
            'email_to': mail,
        })
        mail.send()

        values = {}
        return request.website.render("theme_dermanord.contactus_response", values)









        
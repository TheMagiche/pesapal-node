/**
 *  Copyright (c) 2020 themagiche
 *  All rights reserved
 *  Contact: magiche.mc@gmail.com
 *  Website: http://themagiche.gl
 *
 *  Project : pesapal-node
 *  File : xml.js
 *  
 *  Description : Creeate xml object to send to pesapal
 */

const builder =  require('xmlbuilder');

/**
 * XML structure in official documentation.
 * @param order
 * @returns {string}
 */
var pesapalXml = function (order) {

    var root = builder.create('PesapalDirectOrderInfo');
        root.att('Amount', order.amount)
        .att('Currency',order.currency)
        .att('Description',order.description)
        .att('Type', order.type)
        .att('Reference',order.reference)
        .att('FirsName',order.Customer.firstname)
        .att('LastName',order.Customer.lastname)
        .att('Email',order.Customer.email)
        .att('PhoneNumber',order.Customer.phonenumber)  

    var rootAttrs = {
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
        'xmlns': 'http://www.pesapal.com',
      };
      for (var k in rootAttrs){
        root.att(k, rootAttrs[k]);
      }
      
    // Add items to 'lineitem'
    if (order.orderItems.length > 0) {
        var item = root.ele('lineitems');
       
        order.orderItems.forEach(element => {
            var el = item.ele('lineitem');
            el.att('uniqueid', element.itemID)
              .att('particulars', element.particulars)
              .att('quantity',element.quantity)
              .att('unitcost',element.unitCost)
              .att('subtotal',element.subTotal)
        });      
    }
    
    var xml = root.end({ pretty: true});

    return xml
}

/**
 * Generate direct order XML
 * @param order
 * @returns {string}
 */
exports.generate = function (order) {
    return pesapalXml(order);
};
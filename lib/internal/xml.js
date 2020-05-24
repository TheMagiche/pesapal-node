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

const builder =  require('xmlbuilder',{ encoding: 'utf-8' });

/**
 * XML structure in official documentation.
 * @param order
 * @returns {string}
 */
let pesapalXml = function (order) {
   
    let root = builder.create('PesapalDirectOrderInfo',
        {
            'xmlns:xsi':'http://www.w3.org/2001/XMLSchema-instance',
            'xmins:xsd': 'http://www.w3.org/2001/XMLSchema',
            'amount': order.amount,
            'currency':order.currency,
            'description':order.description,
            'type': order.type,
            'reference':order.reference,
            'firstname':order.Customer.firstname,
            'lastname':order.Customer.lastname,
            'email':order.Customer.email,
            'phonenumber':order.Customer.phonenumber,
            'xmlns':order.xmlns // can be http://demo.pesapal.com || http://www.pesapal.com
        }   
    );
    // Add items to 'lineitem'
    if (order.orderItems.length != 0) {
        let item = root.ele('lineitems');
       
        order.orderItems.forEach(element => {
            item.ele('lineitem',{
                'uniqueid':element.itemID,
                'particulars':element.paticulars,
                'quantity':element.quantity,
                'unitcost':element.unitCost,
                'subtotal':element.subTotal
            });
        });      
    }
    
    let xml = root.end({ pretty: true});

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
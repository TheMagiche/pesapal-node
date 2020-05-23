/**
 *  Copyright (c) 2020 themagiche
 *  All rights reserved
 *  Contact: magiche.mc@gmail.com
 *  Website: http://themagiche.gl
 *
 *  Project : pesapal-node
 *  File : model.js
 *  
 *  Description : Create models for different method transactions 
 *                Using classes
 */


const pesapalXml = require('./xml');

/** 
    * CustomerDetails
    * @type {{CustomerDetails()}}
    * 
*/
class CustomerDetails{
    /** 
    * Payment Method
    * @param firstname{String}
    * @param lastname {String}
    * @param email {String}
    * @param phonenumber {String}
    */

    constructor(firstname, lastname, email, phonenumber){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phonenumber = phonenumber;
       
    }
    toJSON(proto){
        let jsoned = {};
        let toConvert = proto || this;
        Object.getOwnPropertyNames(toConvert).forEach((prop) => {
            const val = toConvert[prop];
            // don't include those
            if (prop === 'toJSON' || prop === 'constructor') {
                return;
            }
            if (typeof val === 'function') {
                jsoned[prop] = val.bind(jsoned);
                return;
            }
            jsoned[prop] = val;
        });
        return jsoned;
    }
}

/** 
    * OrderItems
    * @type {{OrderItem()}}
    * 
*/

class OrderItem{
    /** 
    * Order Item
    * @param itemID{String}
    * @param particulars {String}
    * @param quantity {Number}
    * @param unitCost {Number}
    * @param details {String}
    * 
    */
    constructor(itemID, particulars, quantity, unitCost, details){
        this.itemID = itemID;
        this.particulars = particulars
        this.quantity = quantity;
        this.unitCost = unitCost;
        this.details = details;
        this.subTotal = this.quantity * this.unitCost;
    }
    //TODO: Implement getters & setters
    toJSON(proto){
        let jsoned = {};
        let toConvert = proto || this;
        Object.getOwnPropertyNames(toConvert).forEach((prop) => {
            const val = toConvert[prop];
            // don't include those
            if (prop === 'toJSON' || prop === 'constructor') {
                return;
            }
            if (typeof val === 'function') {
                jsoned[prop] = val.bind(jsoned);
                return;
            }
            jsoned[prop] = val;
        });
        return jsoned;
    }
}

/** 
    * CustomerOrder
    * @type {{CustomerOrder()}}
    * 
*/

class CustomerOrder{
    /** 
    * Customer Order
    * @param reference {String}
    * @param Customer {Customer}
    * @param description {String}
    * @param amount {Number}
    * @param currency {String}
    * @param type {String}
    * 
    */
    constructor(reference, Customer, description, amount, currency, type, orders = []){
        this.reference = reference;
        this.Customer = Customer;
        this.description = description;
        this.amount = amount || 0.0;
        this.currency = currency || 'KES';
        this.type = type || 'MERCHANT';

        // Other variables
        this.orderItems = orders;
    }

    /**
     * Add an orders subtotal to total amount
     * @param items {OrderItem}
     */
    addOrderItems(){
        if (orderItems.length != 0) {
            this.orderItems.forEach(element => {
                this.amount += element.subTotal;
            });
        }
    }

    /**
     * Form an XML version of this order. See PesaPal request   data schema
     * @returns {String}
     */
    toXML(){
        return pesapalXml.generate(this);
    }

}


module.exports = {
    CustomerDetails,
    OrderItem,
    CustomerOrder
}
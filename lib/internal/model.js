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

    constructor(opts = {}){
        this.firstname = opts.firstname;
        this.lastname = opts.lastname;
        this.email = opts.email;
        this.phonenumber = opts.phonenumber;
       
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
    constructor(opts = {}){
        this.itemID = opts.itemID;
        this.particulars = opts.particulars
        this.quantity = opts.quantity;
        this.unitCost = opts.unitCost;
        this.details = opts.details;
       
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
    constructor(opts = {}){
        this.reference = opts.reference;
        this.Customer = opts.Customer;
        this.description = opts.description;
        this.amount = opts.amount || 0.0;
        this.currency = opts.currency || 'KES';
        this.type = opts.type || 'MERCHANT';
        this.xmlns = opts.xmlns
        // Other variables
        this.orderItems = opts.orders;
    }

    /**
     * Add an orders subtotal to total amount
     * @param items {OrderItem}
     */
    addOrderItems(){
        if (this.orderItems.length != 0) {
            this.orderItems.forEach(element => {
                this.amount += element.subTotal;
            });
        }
        return this;
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


module.exports = {
    CustomerDetails,
    OrderItem,
    CustomerOrder
}
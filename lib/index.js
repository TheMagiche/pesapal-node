/**
 *  Copyright (c) 2020 themagiche
 *  All rights reserved
 *  Contact: magiche.mc@gmail.com
 *  Website: http://themagiche.gl
 *
 *  Project : pesapal-node
 *  File : index.js
 *  
 *  Description : Create the Pesapal Object
 */

const core = require('./internal/core');
const model = require('./internal/model');
const got = require('got');

/** 
 * PesaPal
 *  create a class to access methods relating to the PesaPal 
 *  API endpoints
 *  @method customerDetail()
 *  @method orderDetail()
 *  @method sendPostPesaPalDirectOrder()
 *  @method getQueryPaymentStatus()
 *  @method getQueryPaymentStatusByMerchantRef()
 *  @method getQueryPaymentDetails()
 */
class PesaPal{

    constructor(opts = {}){
        this.sitename = opts.sitename;
        this.consumer_key = opts.consumer_key;
        this.consumer_secret = opts.consumer_secret;
        this.debug = opts.debug;
    }

    /**
         * Will call CustomerDetail
         * @send firstname, lastname, email, phonenumber
         * @receive JSON implemetation of CustomerDetail
         */
    customerDetail(opts = {}){
       let customerDetail =new model.CustomerDetails({
            firstname: opts.firstname,
            lastname: opts.lastname,
            email: opts.email,
            phonenumber: opts.phonenumber
       }).toJSON();
       return customerDetail;
    }

    /**
         * Will call OrderItem
         * @send itemID, particulars, quantity, unitCost, details
         * @receive JSON implemetation of OrderItem
         */
    orderDetail(opts = {}){
        let orderitem = new model.OrderItem({
            itemID: opts.itemID,
            particulars: opts.particulars,
            quantity: opts.quantity,
            unitCost: opts.unitCost,
            details: opts.details,
        }).toJSON();  
        
        return orderitem;
    }

    /**
         * Will call PostPesaDirectOrderV4
         * @send customerDetails , orders
         * @receive redirect url to payment page on pesapal
         */
    sendPostPesaPalDirectOrder(opts = {}){
        let postPesaDirectOrderUrl = new core.PostPesaPalDirectOrderV4({
            sitename: this.sitename,
            consumer_key: this.consumer_key,
            consumer_secret: this.consumer_secret,
            debug: this.debug
        }).setupPayment(opts.reference,opts.customerDetails, opts.description,opts.orders);

        return postPesaDirectOrderUrl;
    }

    /**
         * Will call QueryPaymentStatus
         * @send merchant_ref merchant_tracking_id from 
         * req.params
         * @receive status of the payment as follows:
         * <PENDING|COMPLETED|FAILED|INVALID>
         */
    getQueryPaymentStatus(opts = {}){
        let pesapalResponseData = new core.QueryPaymentStatus({
            consumer_key: this.consumer_key,
            consumer_secret: this.consumer_secret,
            debug: this.debug
        }).responseData(opts.merchant_ref, opts.merchant_tracking_id);

        return pesapalResponseData;
    }

    
    /**
         * Will call QueryPaymentStatusByMerchantRef
         * @send merchant_tracking_id from 
         * req.params
         * @receive status of the payment as follows:
         * <PENDING|COMPLETED|FAILED|INVALID>
         */
    getQueryPaymentStatusByMerchantRef(opts = {}){
        let pesapalResponseData = new core.QueryPaymentStatusByMerchantRef({
            consumer_key: this.consumer_key,
            consumer_secret: this.consumer_secret,
            debug: this.debug
        }).responseData(opts.merchant_ref);

        return pesapalResponseData;
    }

    /**
         * Will call QueryPaymentDetails
         * @send merchant_tracking_id from 
         * req.params
         * @receive Four values are returned as a comma separated string, as follows:
         *  pesapal_transaction_tracking_id,payment_method,payment_status,pesapal_merchant_reference
         */
    getQueryPaymentDetails(opts = {}){
        let pesapalResponseData = new core.QueryPaymentDetails({
            consumer_key: this.consumer_key,
            consumer_secret: this.consumer_secret,
            debug: this.debug
        }).responseData(opts.merchant_ref, opts.merchant_tracking_id);

        return pesapalResponseData;

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
module.exports ={
    PesaPal
}
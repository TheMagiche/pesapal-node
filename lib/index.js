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

    constructor(sitename, consumer_key , consumer_secret, debug){
        this.sitename = sitename;
        this.consumer_key = consumer_key;
        this.consumer_secret = consumer_secret;
        this.debug = debug;
    }

    /**
         * Will call CustomerDetail
         * @send firstname, lastname, email, phonenumber
         * @receive JSON implemetation of CustomerDetail
         */
    customerDetail(firstname, lastname, email, phonenumber){
       let customerDetail = model.CustomerDetails({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phonenumber: phonenumber
       }).toJSON();
       return customerDetail;
    }

    /**
         * Will call OrderItem
         * @send itemID, particulars, quantity, unitCost, details
         * @receive JSON implemetation of OrderItem
         */
    orderDetail(itemID, particulars, quantity, unitCost, details){
        let orderitem = model.OrderItem({
            itemID: itemID,
            particulars: particulars,
            quantity: quantity,
            unitCost: unitCost,
            details: details,
        }).toJSON();  
        
        return orderitem;
    }

    /**
         * Will call PostPesaDirectOrderV4
         * @send customerDetails , orders
         * @receive redirect url to payment page on pesapal
         */
    sendPostPesaPalDirectOrder(reference,customerDetails, description, orders = []){
        let postPesaDirectOrderUrl = core.PostPesaPalDirectOrderV4({
            sitename: this.sitename,
            consumer_key: this.consumer_key,
            consumer_secret: this.consumer_secret,
            debug: this.debug
        }).setupPayment(reference,customerDetails, description,orders);

        return postPesaDirectOrderUrl;
    }

    /**
         * Will call QueryPaymentStatus
         * @send merchant_ref merchant_tracking_id from 
         * req.params
         * @receive status of the payment as follows:
         * <PENDING|COMPLETED|FAILED|INVALID>
         */
    getQueryPaymentStatus(merchant_ref, merchant_tracking_id){
        let pesapalResponseData = core.QueryPaymentStatus({
            consumer_key: this.consumer_key,
            consumer_secret: this.consumer_secret,
            debug: this.debug
        }).responseData(merchant_ref, merchant_tracking_id);

        return pesapalResponseData;
    }

    
    /**
         * Will call QueryPaymentStatusByMerchantRef
         * @send merchant_tracking_id from 
         * req.params
         * @receive status of the payment as follows:
         * <PENDING|COMPLETED|FAILED|INVALID>
         */
    getQueryPaymentStatusByMerchantRef(merchant_ref){
        let pesapalResponseData = core.QueryPaymentStatusByMerchantRef({
            consumer_key: this.consumer_key,
            consumer_secret: this.consumer_secret,
            debug: this.debug
        }).responseData(merchant_ref);

        return pesapalResponseData;
    }

    /**
         * Will call QueryPaymentDetails
         * @send merchant_tracking_id from 
         * req.params
         * @receive Four values are returned as a comma separated string, as follows:
         *  pesapal_transaction_tracking_id,payment_method,payment_status,pesapal_merchant_reference
         */
    getQueryPaymentDetails(merchant_ref, merchant_tracking_id){
        let pesapalResponseData = core.QueryPaymentDetails({
            consumer_key: this.consumer_key,
            consumer_secret: this.consumer_secret,
            debug: this.debug
        }).responseData(merchant_ref, merchant_tracking_id);

        return pesapalResponseData;

    }

}
module.exports ={
    PesaPal
}
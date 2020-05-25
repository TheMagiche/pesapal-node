/**
 *  Copyright (c) 2020 themagiche
 *  All rights reserved
 *  Contact: magiche.mc@gmail.com
 *  Website: http://themagiche.gl
 *
 *  Project : pesapal-node
 *  File : core.js
 *  
 *  Description : Hook up models and xml builder
 */


 
const OAuthSimple = require('oauthsimple');
const model = require('./model');
const pesapalXml = require('./xml');


/**
  * Handle PostPesapalDirectOrderV4 
  * 
  * URL: https://www.pesapal.com/API/PostPesapalDirectOrderV4
  *  
*/
class PostPesaPalDirectOrderV4{
    /** 
    * PostPesapalDirectOrderV4
    * url ~ https://www.pesapal.com/API/PostPesapalDirectOrderV4
    */
   /**
    * Needed items according to API specs
    * @param oauth_callback{String} ~ page on your site the users will be redirected to, after they have made the payment on PesaPal.
    * @param oauth_consumer_key {String} ~When you register as a merchant on PesaPal, you will receive your consumer key and secret via email.
    Please Note: it is very important that you store the consumer secret safely.
    * @param ouath_nonce {String} ~ This must be unique for each PesaPal API request you make. Tip: a date-time based value may ensure uniqueness across all your requests.
    * @param oauth_signature {String} ~ PesaPal uses the OAuth protocol to authenticate API requests. The request is signed using the Consumer Secret you received at registration.
    * @param oauth_signature_method {HMAC-SHA1}
    * @param oauth_timestamp {Date()}
    * @param oauth_version  {1.0}
    * @param pesapal_request_data {CustomerOrder}
    */
   
    constructor(opts = {}){
        this.sitename = opts.sitename;
        this.consumer_key = opts.consumer_key;
        this.consumer_secret = opts.consumer_secret;
        this.debug =  opts.debug;
    }
    setupPayment(reference,customerDetails,description, orders){
        let xmlns = this.debug ? " http://demo.pesapal.com" : "http://www.pesapal.com"
        let pesapalData = new model.CustomerOrder({
            reference: reference,
            Customer: customerDetails,
            description: description,
            orders: orders,
            xmlns: xmlns
        }).addOrderItems().toJSON();
        let pesapalRequestData = pesapalXml.generate(pesapalData);
     
        let params = {
            'oauth_callback': this.sitename,
            'pesapal_request_data': pesapalRequestData
        } 
        let directOrderUrl = this.debug ? 'https://demo.pesapal.com/API/PostPesapalDirectOrderV4' : 'https://www.pesapal.com/API/PostPesapalDirectOrderV4';
        let oauth = new OAuthSimple(this.consumer_key,this.consumer_secret);
        let request = oauth.sign({
            action:"GET",
            path: directOrderUrl, // Sould go to either demo or actual
            parameters: params // should contain most details
        });

        return request.signed_url;  // Generates a payment page url  
    }

}

/**
  * Handle QueryPaymentStatus
  * 
  * URL: https://www.pesapal.com/API/QueryPaymentStatus
  *  
*/
class QueryPaymentStatus{
    /** 
    * QueryPaymentStatus
    * url ~ https://www.pesapal.com/API/QueryPaymentStatus
    */
   /**
    * Needed items according to API specs
    * @param oauth_consumer_key {String} ~When you register as a merchant on PesaPal, you will receive your consumer key and secret via email.
    Please Note: it is very important that you store the consumer secret safely.
    * @param ouath_nonce {String} ~ This must be unique for each PesaPal API request you make. Tip: a date-time based value may ensure uniqueness across all your requests.
    * @param oauth_signature {String} ~ PesaPal uses the OAuth protocol to authenticate API requests. The request is signed using the Consumer Secret you received at registration.
    * @param oauth_signature_method {HMAC-SHA1}
    * @param oauth_timestamp {Date()}
    * @param oauth_version  {1.0}
    * @param pesapal_merchant_reference{String}
    * @param pesapal_transaction_tracking_id{String}
    */
    constructor(opts = {}){
        this.consumer_key = opts.consumer_key;
        this.consumer_secret = opts.consumer_secret;
        this.debug =  opts.debug;
    }

    responseData(merchant_ref, merchant_tracking_id){
        let params = {
            'pesapal_merchant_reference': merchant_ref,
            'pesapal_transaction_tracking_id': merchant_tracking_id
        }       
        let queryParamUrl = this.debug ? 'https://demo.pesapal.com/API/QueryPaymentStatus' : 'https://www.pesapal.com/API/QueryPaymentStatus';
        let oauth = OAuthSimple(this.consumer_key,this.consumer_secret);
        let request = oauth.sign({
            action:"GET",
            path: queryParamUrl, // Sould go to either demo or actual
            parameters: params // should contain most details
        });
       
            return request.signed_url;  // Parse the url using any request lib  
    }
}
/**
  * Handle QueryPaymentStatus
  * Same as QueryPaymentStatus above, but pesapal_transaction_tracking_id is not required.
  * URL: https://www.pesapal.com/API/QueryPaymentStatusByMerchantRef
  *  
*/
class QueryPaymentStatusByMerchantRef{
    /** 
    * QueryPaymentStatusByMerchantRef
    * url ~ https://www.pesapal.com/API/QueryPaymentStatusByMerchantRef
    */
   /**
     * Needed items according to API specs
    * @param oauth_consumer_key {String} ~When you register as a merchant on PesaPal, you will receive your consumer key and secret via email.
    Please Note: it is very important that you store the consumer secret safely.
    * @param ouath_nonce {String} ~ This must be unique for each PesaPal API request you make. Tip: a date-time based value may ensure uniqueness across all your requests.
    * @param oauth_signature {String} ~ PesaPal uses the OAuth protocol to authenticate API requests. The request is signed using the Consumer Secret you received at registration.
    * @param oauth_signature_method {HMAC-SHA1}
    * @param oauth_timestamp {Date()}
    * @param oauth_version  {1.0}
    * @param pesapal_merchant_reference{String}
    */
    constructor(opts = {}){
        this.consumer_key = opts.consumer_key;
        this.consumer_secret = opts.consumer_secret;
        this.debug = opts.debug;
    }
    responseData(merchant_ref){
        let params = {
            'pesapal_merchant_reference': merchant_ref,
        }       
        let queryParamUrl = this.debug ? 'https://demo.pesapal.com/API/QueryPaymentStatusByMerchantRef' : 'https://www.pesapal.com/API/QueryPaymentStatusByMerchantRef';
        let oauth = OAuthSimple(this.consumer_key,this.consumer_secret);
        let request = oauth.sign({
            action:"GET",
            path: queryParamUrl, // Sould go to either demo or actual
            parameters: params // should contain most details
        });
  
        return request.signed_url;  // Parse the url using any request lib   
    }

}

/**
  * Handle  QueryPaymentDetails
  * Same as QueryPaymentStatus above, but the return value contains more information.
  * URL: https://www.pesapal.com/API/QueryPaymentStatusByMerchantRef
  *  
*/
class QueryPaymentDetails{
    /** 
    * QueryPaymentDetails
    * url ~ https://www.pesapal.com/API/QueryPaymentDetails
    */
   /**
    * Needed items according to API specs
    * @param oauth_consumer_key {String} ~When you register as a merchant on PesaPal, you will receive your consumer key and secret via email.
    Please Note: it is very important that you store the consumer secret safely.
    * @param ouath_nonce {String} ~ This must be unique for each PesaPal API request you make. Tip: a date-time based value may ensure uniqueness across all your requests.
    * @param oauth_signature {String} ~ PesaPal uses the OAuth protocol to authenticate API requests. The request is signed using the Consumer Secret you received at registration.
    * @param oauth_signature_method {HMAC-SHA1}
    * @param oauth_timestamp {Date()}
    * @param oauth_version  {1.0}
    * @param pesapal_merchant_reference{String}
    * @param pesapal_transaction_tracking_id{String}
    */
    constructor(opts = {}){
        this.consumer_key = opts.consumer_key;
        this.consumer_secret = opts.consumer_secret;
        this.debug =  opts.debug;
    }
    responseData(merchant_ref, merchant_tracking_id){
        let params = {
            'pesapal_merchant_reference': merchant_ref,
            'pesapal_transaction_tracking_id': merchant_tracking_id
        }       
        let queryParamUrl = this.debug ? 'https://demo.pesapal.com/API/QueryPaymentDetails' : 'https://www.pesapal.com/API/QueryPaymentDetails';
        let oauth = OAuthSimple(this.consumer_key,this.consumer_secret);
        let request = oauth.sign({
            action:"GET",
            path: queryParamUrl, // Sould go to either demo or actual
            parameters: params // should contain most details
        });
       
        return request.signed_url;  // Parse the url using any request lib  
    }
}

module.exports ={
    PostPesaPalDirectOrderV4,
    QueryPaymentStatus,
    QueryPaymentStatusByMerchantRef,
    QueryPaymentDetails
}
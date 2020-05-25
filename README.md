# Pesapal-node

### STATUS

Version 1.0.1

### Goal

Make it easy to integrate [PesaPal](https://www.pesapal.com) into a website or mobile app.

### Core Features
- `customerDetail(firstname, lastname, email, phonenumber)`: `Model` Create a customers details

- ` orderDetail(itemID, particulars, quantity, unitCost, details)` : `Model` Create a order detail

- `sendPostPesaPalDirectOrder(reference,customerDetails, description, orders = [])`: Send an order to PostPesaDirectOrderV4 API Endpoint and receive a redirect url for cients to make their payment. PesaPal will redirect to a url with the following format once the payment is completed:
http://www.mysite.com/processingorder? pesapal_transaction_tracking_id=195035be-56bb-48ba-8439-7e12196cb87e&pesapal_merchant_reference=12345

- `getQueryPaymentStatus(merchant_ref, merchant_tracking_id)`: Send pesapal_transaction_tracking_id & pesapal_merchant_reference to return the status of the payment is returned as follows: pesapal_response_data `=<PENDING|COMPLETED|FAILED|INVALID>`. A return value of INVALID indicates that the transaction with the Reference you provided could not be found. If you receive a return value of PENDING, you will have to query PesaPal again, until you receive COMPLETED or FAILED as the response.

- `getQueryPaymentStatusByMerchantRef(merchant_ref)`: Same as QueryPaymentStatus above, but pesapal_transaction_tracking_id is not required.

- `getQueryPaymentDetails(merchant_ref, merchant_tracking_id)`: Same as QueryPaymentStatus above, but the return value contains more information.

### Usage

###### Install

```shell
$ npm install pesapal-node
```

###### Setup
```javascript
const PesaPal = require('pesapal-node');
let pesapal = new PesaPal({
    sitename: '<Your Site>',
    consumer_key: '<Consumer Key provided by pesapal.com>',
    consumer_secret: '<Consumer Secret provided by pesapal.com>',
    debug: true // false in production!
});

// Create Customer Details

let customer = pesapal.customerDetail({
    fistname: '',
    lastname: '',
    email: '',
    phonenumber: '',
});

// Create Order Detail <as many as required>
let order = pesapal.orderDetail({
    itemID: '<unique string value for item>',
    particulars: 'Details of the item',
    quatity: '<Numeric value of order',
    unitCost: '<Numeric value of price of item>',
    details: '<information about the order>'
});

// Place orders in an array
let orders = [];
orders.push(order);

// make a call to the PESAPALDIRECTORDER
let postOrderUrl = pesapal.sendPostPesaPalDirectOrder({
    reference: '<unique string value to indicate order>',
    customerDetails: customer,
    description:'Description of order',
    orders: orders
}); // Returns a url to redirect to pesapal payment page

/* 

Get status of payment using information from req.params
using either 
~getQueryPaymentStatus(merchant_ref, merchant_tracking_id)
~getQueryPaymentStatusByMerchantRef(merchant_ref)
~getQueryPaymentDetails(merchant_ref, merchant_tracking_id)

*/
let queryUrl = pesapal.getQueryPaymentDetails({
    merchant_ref:'',
    merchant_tracking_id:''
});

/* 

Use a request lib such as got to parse the
results

*/
const got = require('got');
(async () => {
    try {
        const response = await got(pesapalQueryUrl);
        console.log(response.body);
        //=> '<!doctype html> ...'
    } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
    }
})();


```
When the `debug` option is set, `pesapal-node` will use the `demo.pesapal.com/*` endpoints.
    


### Contributing

1. Fork this repo and make changes in your own fork.
2. Commit your changes and push to your fork `git push origin master`
3. Create a new pull request and submit it back to the project.


### Bugs & Issues
To report bugs (or any other issues), use the [issues page](https://github.com/TheMagiche/pesapal-node/issues).



var express = require('express');
var app = express();

var fedexAPI = require('shipping-fedex');

var fedex = new fedexAPI({
    environment: 'sandbox', // or live
    debug: true,
    key: 'CiKzaH4Qgobgxzqe',  //Ae0IBPQ38ym7HHkf
    password: 'Y9zmwbKcaR9PPPuh02V7121az',    //Leicester@3524  // p1m6NAFTZHYVzmYsqrgQ408gF
    account_number: '751281188',
    meter_number: '109317923',
    imperial: true // set to false for metric
});

import {FedexRoutes} from "./routes/fedex";

let fedexRoutes          = new FedexRoutes(fedex);

app.get('/', fedexRoutes.checkRates());
app.get('/freight', fedexRoutes.freightRates());
app.get('/ship', fedexRoutes.ship());
app.get('/track', fedexRoutes.track());


app.listen(3000);

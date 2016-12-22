var express = require('express');
var app = express();

var fedexAPI = require('shipping-fedex');

// var fedex = new fedexAPI({
//     environment: 'sandbox', // or live
//     debug: true,
//     key: 'Ae0IBPQ38ym7HHkf',  //Ae0IBPQ38ym7HHkf  //Ae0IBPQ38ym7HHkf //CiKzaH4Qgobgxzqe
//     password: 'Am6EZbecQsKrZz9gfXTNihEYM',    // Am6EZbecQsKrZz9gfXTNihEYM  //Y9zmwbKcaR9PPPuh02V7121az
//     account_number: '510087526',  //510087526  //751281188
//     meter_number: '118721522', //118721522    //109317923
//     imperial: true // set to false for metric
// });

var fedex = new fedexAPI({
    environment: 'live', // or live
    debug: true,
    key: 'PGq6d6iXSngFS5cK',  //Ae0IBPQ38ym7HHkf  //Ae0IBPQ38ym7HHkf //CiKzaH4Qgobgxzqe
    password: 'IsFMqHH1hkV5vUuqOZJTKr46F',    // Am6EZbecQsKrZz9gfXTNihEYM  //Y9zmwbKcaR9PPPuh02V7121az
    account_number: '751281188',  //510087526  //751281188
    meter_number: '110428873', //118721522    //109317923
    imperial: true // set to false for metric
});

import {FedexRoutes} from "./routes/fedex";

let fedexRoutes          = new FedexRoutes(fedex);

app.get('/', fedexRoutes.checkRates());
app.get('/freight', fedexRoutes.freightRates());
app.get('/ship', fedexRoutes.ship());
app.get('/track', fedexRoutes.track());


app.listen(3000);

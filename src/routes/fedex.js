"use strict";

var util = require('util');
var fs = require('fs');

export  class FedexRoutes {

    constructor(fedex){
        this._fedex = fedex;
    }

    /**
     * rates
     */
    checkRates(){
        return [
            (req, res) => {

                return this._fedex.rates({
                        ReturnTransitAndCommit: true,
                        CarrierCodes: ['FDXE','FDXG'],
                        RequestedShipment: {
                            DropoffType: 'REGULAR_PICKUP',
                            ServiceType: 'FEDEX_GROUND',
                            PackagingType: 'YOUR_PACKAGING',
                            Shipper: {
                                Contact: {
                                    PersonName: 'KilimanjaroCoffeeCupCompany',
                                    CompanyName: 'KilimanjaroCoffeeCupCompany',
                                    PhoneNumber: ''
                                },
                                Address: {
                                    StreetLines: [
                                        '1947 San Pasqual St'
                                    ],
                                    City: 'Pasadena',
                                    StateOrProvinceCode: 'CA',
                                    PostalCode: '91107',
                                    CountryCode: 'US'
                                }
                            },
                            Recipient: {
                                Contact: {
                                    PersonName: req.query.uadd_recipient,
                                    CompanyName: '',
                                    PhoneNumber: req.query.uadd_phone
                                },
                                Address: {
                                    StreetLines: [
                                        req.query.uadd_address_01,
                                        req.query.uadd_address_02
                                    ],
                                    City: req.query.uadd_city,
                                    StateOrProvinceCode: req.query.uadd_county,
                                    PostalCode: req.query.uadd_post_code,
                                    CountryCode: 'US',
                                    Residential: false
                                }
                            },
                            ShippingChargesPayment: {
                                PaymentType: 'SENDER',
                                Payor: {
                                    ResponsibleParty: {
                                        AccountNumber: '751281188'
                                    }
                                }
                            },
                            PackageCount: '1',
                            RequestedPackageLineItems: {
                                SequenceNumber: 1,
                                GroupPackageCount: 1,
                                Weight: {
                                    Units: 'LB',
                                    Value: '3.0'
                                },
                                Dimensions: {
                                    Length: 30,
                                    Width: 5,
                                    Height: 5,
                                    Units: 'IN'
                                }
                            }
                        }
                    }, function(err, result) {
                        if(err) {
                            return res.send({success : 0, message : "Error", data : err });
                        }
                    return res.send({success : 1, message : "Success", data : result });

                    });
            }
        ];
    }

    /**
     * Freight Rates
     */
    freightRates(){
        return [
            (req, res) => {
                console.log("I am in");
                this._fedex.freight_rates({}, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send({success : 0, message : "Error", data : err });
                    }
                    console.log("herre++++++");
                    return res.send({success : 1, message : "Success", data : result });
                });
            }
        ]
    }

    track(){
        return [
            (req, res) => {
                this._fedex.track({
                    SelectionDetails: {
                        PackageIdentifier: {
                            Type: 'TRACKING_NUMBER_OR_DOORTAG',
                            Value: '794643569031'
                        }
                    }
                }, function(err, result) {
                    if(err) {
                        return console.log(err);
                    }

                    return res.send({success : 1, message : "Success", data : result });
                });
            }
        ]
    }

    ship(){
        return [
            (req, res) => {
                var date = new Date();
                this._fedex.ship({
                    RequestedShipment: {
                        ShipTimestamp: new Date(date.getTime() + (24*60*60*1000)).toISOString(),
                        DropoffType: 'REGULAR_PICKUP',
                        ServiceType: 'FEDEX_GROUND',
                        PackagingType: 'YOUR_PACKAGING',
                        Shipper: {
                            Contact: {
                                PersonName: 'KilimanjaroCoffeeCupCompany',
                                CompanyName: 'KilimanjaroCoffeeCupCompany',
                                PhoneNumber: '07448240672'
                            },
                            Address: {
                                StreetLines: [
                                    '1947 San Pasqual St'
                                ],
                                City: 'Pasadena',
                                StateOrProvinceCode: 'CA',
                                PostalCode: '91107',
                                CountryCode: 'US'
                            }
                        },
                        Recipient: {
                            Contact: {
                                PersonName: req.query.uadd_recipient,
                                CompanyName: '',
                                PhoneNumber: req.query.uadd_phone
                            },
                            Address: {
                                StreetLines: [
                                    req.query.uadd_address_01,
                                    req.query.uadd_address_02,
                                ],
                                City: req.query.uadd_city,
                                StateOrProvinceCode: req.query.uadd_county,
                                PostalCode: req.query.uadd_post_code,
                                CountryCode: 'US',
                                Residential: false
                            }
                        },
                        ShippingChargesPayment: {
                            PaymentType: 'SENDER',
                            Payor: {
                                ResponsibleParty: {
                                    AccountNumber: this._fedex.options.account_number
                                }
                            }
                        },
                        LabelSpecification: {
                            LabelFormatType: 'COMMON2D',
                            ImageType: 'PDF',
                            LabelStockType: 'PAPER_4X6'
                        },
                        PackageCount: '1',
                        RequestedPackageLineItems: [{
                            SequenceNumber: 1,
                            GroupPackageCount: 1,
                            Weight: {
                                Units: 'LB',
                                Value: '3.0'
                            },
                            Dimensions: {
                                Length: 30,
                                Width: 5,
                                Height: 5,
                                Units: 'IN'
                            }
                        }]
                    }
                }, function(err, result) {
                    if(err) {
                        return console.log(util.inspect(err, {depth: null}));
                    }
                    return res.send({success : 1, message : "Success", data : result });

                });
            }
        ]
    }
}

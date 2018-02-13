/**
 * (c) Copyright 2018 Clause Inc., all rights reserved.
 */
'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */

/**
 * Execute the smart clause
 * @param {Context} context - the Accord context
 * @param {io.clause.demo.fragileGoods.DeliveryUpdate} context.request - the incoming request
 * @param {io.clause.outbound.physical.payments.xero.XeroInvoice} context.response - the response
 * @AccordClauseLogic
 */
function execute(context) {
    logger.info(context);
    var req = context.request;
    var res = context.response;
    var data = context.data;


    res.type = 'ACCREC';
    res.currency = 'USD';
    res.accountName = 'Alice\'s Party Supplies';
    res.lineItems = [];
    res.lineItems[0] = factory.newConcept('io.clause.outbound.physical.payments.xero', 'XeroLineItem');
    res.lineItems[0].description = '';
    res.lineItems[0].quantity = 1;
    res.lineItems[0].unitAmount = data.deliveryPrice;

    req.accelerometerReadings.forEach(function(r){
        if(r > data.accelerationMax){
            res.lineItems[0].unitAmount -= data.accelerationBreachPenalty;
        }
        if(r < data.accelerationMin){
            res.lineItems[0].unitAmount -= data.accelerationBreachPenalty;
        }
    });

    if(req.status === 'ARRIVED'){
        switch(data.deliveryLimitDuration.unit){
        case 'SECOND':
            var duration = req.finishTime.getTime() - req.startTime.getTime();
            if((duration / 1000)>data.deliveryLimitDuration.amount){
                res.lineItems[0].unitAmount -= data.lateDeliveryPenalty;
            }
            break;
        default:
                // TODO (MR) Implement other units
        }
    }

}

/* eslint-enable no-unused-vars */
/* eslint-enable no-undef */

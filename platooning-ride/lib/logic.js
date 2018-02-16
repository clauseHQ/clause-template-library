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
 * @param {io.clause.platoon.ExitPlatoon} context.request - the incoming request
 * @param {io.clause.outbound.physical.payments.xero.XeroAddLineItemToInvoice} context.response - the response
 * @AccordClauseLogic
 */
function ExitPlatoon(context) {
    logger.info(context);
    var req = context.request;
    var res = context.response;
    var data = context.data;

    let vehicle = req.vehicle;
    let totalDistance = req.distance;

    // Build the outbound payload
    res.invoiceId = '7a1f50d3-86ae-42d4-9238-2f9bcd9f1411';
    res.lineItem = factory.newConcept('io.clause.outbound.physical.payments.xero', 'XeroLineItem');
    res.lineItem.description = formatDate(new Date()) + '. Vehicle ' + vehicle.getIdentifier() + '. ' + Math.round(totalDistance) + ' km';
    res.lineItem.quantity = totalDistance;
    res.lineItem.unitAmount = data.highAutomationFeePerKm;
    res.lineItem.itemCode= 'RIDER';
    // logger.info(context);

}

/**
 *
 * @param {Date} date - the date
 * @returns {string} - formatted date
 */
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) {month = '0' + month;}
    if (day.length < 2) {day = '0' + day;}

    return [year, month, day].join('-');
}

/* eslint-enable no-unused-vars */
/* eslint-enable no-undef */
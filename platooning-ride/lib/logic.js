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
 * @param {io.clause.platoon.FeeCalculations} context.response - the response
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
    res.vehicle = vehicle;
    res.totalDistance = totalDistance;
    res.feePerKm = data.highAutomationFeePerKm;
    // logger.info(context);

}

/* eslint-enable no-unused-vars */
/* eslint-enable no-undef */

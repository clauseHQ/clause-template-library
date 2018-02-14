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
 * @param {io.clause.samples.saasintroduction.Request} context.request - the incoming request
 * @param {io.clause.samples.saasintroduction.Response} context.response - the response
 * @AccordClauseLogic
 */
function execute(context) {
    logger.info(context);
    var req = context.request;
    var res = context.response;
    var data = context.data;
}

/* eslint-enable no-unused-vars */
/* eslint-enable no-undef */

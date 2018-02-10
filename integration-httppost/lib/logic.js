/**
 * (c) Copyright 2018 Clause Inc., all rights reserved.
 */
'use strict';

/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
/*eslint-disable no-var*/

/**
 * Execute the smart clause
 * @param {Context} context - the Accord context
 * @param {io.clause.samples.integration.httppost.Request} context.request - the incoming request
 * @param {io.clause.outbound.physical.Http} context.response - the response
 * @AccordClauseLogic
 */
function execute(context) {
    var req = context.request;
    var res = context.response;
    var data = context.data;
    res.url = data.url;
    res.method = 'POST';
    res.body = req.data;
}

/*eslint-enable no-unused-vars*/
/*eslint-enable no-undef*/
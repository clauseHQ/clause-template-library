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
 * @param {io.clause.samples.integration.ethereum.Request} context.request - the incoming request
 * @param {io.clause.outbound.physical.payments.crypto.ethereum.EthereumTransfer} context.response - the response
 * @AccordClauseLogic
 */
function execute(context) {
    var req = context.request;
    var res = context.response;
    var data = context.data;

    // allow settting gasLimit and gasPrice from request
    res.gasLimit = req.gasLimit;
    res.gasPrice = req.gasPrice;

    // all other data comes from the contract
    res.fromAccount = data.fromAccount;
    res.toAccount = data.toAccount;
    res.weiValue = data.weiValue;
    res.privateKey = data.privateKey;
}

/*eslint-enable no-unused-vars*/
/*eslint-enable no-undef*/
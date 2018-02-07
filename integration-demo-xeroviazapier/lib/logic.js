'use strict';

/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
/*eslint-disable no-var*/

/**
 * Execute the smart clause
 * @param {Context} context - the Accord context
 * @param {io.clause.outbound.logical.Payment} context.request - the incoming request
 * @param {io.clause.outbound.physical.payments.XeroInvoice} context.response - the response
 * @AccordClauseLogic
 */
function execute(context) {
    var req = context.request;
    var res = context.response;
    var data = context.data;

    res.type = 'ACCREC';
    res.currency = req.currency;
    res.accountName = req.destination;
    res.lineItems[0] = factory.newConcept('io.clause.outbound.physical.payments', 'XeroLineItem');
    res.lineItems[0].description = req.description;
    res.lineItems[0].quantity = 1;
    res.lineItems[0].unitAmount = req.amount;
}

/*eslint-enable no-unused-vars*/
/*eslint-enable no-undef*/
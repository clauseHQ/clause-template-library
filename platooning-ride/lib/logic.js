'use strict';
/**
 * Execute the smart clause
 * @param {Context} context - the Accord context
 * @param {io.clause.poc.platooning.EndPlatoon} context.request - the incoming request
 * @param {io.clause.poc.platooning.FeeCalculations} context.response - the response
 * @AccordClauseLogic
 */
function endPlatoon(context) {
    // var ModelManager = require('composer-common').ModelManager;
    // var Serializer = require('composer-common').Serializer;
    // var Factory = require('composer-common').Factory;
    // var fs = require('fs');
    // var path = require('path');
    
    // var rootDir = path.resolve(__dirname, '..');
    // var modelManager = new ModelManager();
    // modelManager.addModelFile(fs.readFileSync(path.resolve(rootDir, 'models/model.cto'), 'utf8'));
    // var factory = new Factory(modelManager);
    // var serializer = new Serializer(factory, modelManager);

    var req = context.request;
    var data = context.data;

    // context.response.serviceProvider = factory.newRelationship('io.clause.poc.platooning','ServiceProvider','1');
    // context.response.serviceProviderFee = 0;
    //     subscribers: [
    //         {
    //             $class: 'io.clause.poc.platooning.SubscriberFeePair',
    //             subscriber: '1',
    //             fee: 0
    //         }
    //     ]
    // }
}
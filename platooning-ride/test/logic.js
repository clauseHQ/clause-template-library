/**
 * (c) Copyright 2018 Clause Inc., all rights reserved.
 */

'use strict';

const Template = require('@accordproject/cicero-core').Template;
const Clause = require('@accordproject/cicero-core').Clause;
const Engine = require('@accordproject/cicero-engine').Engine;
const fs = require('fs');
const path = require('path');

const chai = require('chai');
chai.should();
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));

describe('Logic', () => {

    const rootDir = path.resolve(__dirname, '..');
    const clauseText = fs.readFileSync(path.resolve(rootDir, 'sample.txt'), 'utf8');

    let template;
    let clause;
    let engine;

    beforeEach( async function() {
        template = await Template.fromDirectory(rootDir);
        clause = new Clause(template);
        clause.parse(clauseText);
        engine = new Engine();
    });

    describe('#EndPlatoon', async function() {
        let vehicle1 = {
            $class: 'io.clause.platoon.Vehicle',
            id:'1',
            vehicleSpecification:{
                $class: 'io.clause.platoon.VehicleSpecification',
                make:'X',
                model:'Y',
                year: 2018,
                brakingDistance: 0
            },
            location: {
                $class: 'io.clause.platoon.Location',
                lat:0,
                long:0,
            },
            platoonContractUrl:'',
            vehicleTransactions: [],
        };

        let vehicle2={
            $class: 'io.clause.platoon.Vehicle',
            id:'2',
            vehicleSpecification:{
                $class: 'io.clause.platoon.VehicleSpecification',
                make:'X',
                model:'Y',
                year: 2018,
                brakingDistance: 0
            },
            location: {
                $class: 'io.clause.platoon.Location',
                lat:0,
                long:0,
            },
            platoonContractUrl:'',
            vehicleTransactions: [],
        };

        let state = {
            '$class': 'org.accordproject.common.ContractState',
            'stateId': 'org.accordproject.common.ContractState#1'
        };

        it('should produce correct result', async function() {
            const request = {
                $class: 'io.clause.platoon.ExitPlatoon',
                vehicle: vehicle1,
                platoonLeader: vehicle2,
                distance: 100,
            };
            const result = await engine.execute(clause, request, state);
            result.response.lineItem.quantity.should.be.equal(100);
        });
    });
});
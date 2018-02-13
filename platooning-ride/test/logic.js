/**
 * (c) Copyright 2018 Clause Inc., all rights reserved.
 */

'use strict';

const Template = require('cicero-core').Template;
const Clause = require('cicero-core').Clause;
const Engine = require('cicero-engine').Engine;
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
            vehicleTransactions: [
                {
                    $class: 'io.clause.platoon.JoinPlatoon',
                    transactionId:'0',
                    vehicle: 'resource:io.clause.platoon.Vehicle#1',
                },
                {
                    $class: 'io.clause.platoon.VehicleMovement',
                    transactionId:'1',
                    vehicle: 'resource:io.clause.platoon.Vehicle#1',
                    location: {
                        $class: 'io.clause.platoon.Location',
                        lat:51.0614490,
                        long:-1.3380280,
                    }
                },
                {
                    $class: 'io.clause.platoon.VehicleMovement',
                    transactionId:'2',
                    vehicle: 'resource:io.clause.platoon.Vehicle#2',
                    location: {
                        $class: 'io.clause.platoon.Location',
                        lat:2,
                        long:2,
                    }
                },
                {
                    $class: 'io.clause.platoon.VehicleMovement',
                    transactionId:'3',
                    vehicle: 'resource:io.clause.platoon.Vehicle#1',
                    location: {
                        $class: 'io.clause.platoon.Location',
                        lat:51.0614380,
                        long:-1.3380050,
                    }
                },
                {
                    $class: 'io.clause.platoon.VehicleMovement',
                    transactionId:'4',
                    vehicle: 'resource:io.clause.platoon.Vehicle#1',
                    location: {
                        $class: 'io.clause.platoon.Location',
                        lat:51.0624380,
                        long:-1.3370050,
                    }
                }
            ],
        };

        it('should produce correct result', async function() {
            const request = {
                $class: 'io.clause.platoon.ExitPlatoon',
                vehicle: vehicle1,
                platoonLeader: vehicle2,
            };
            const result = await engine.execute(clause, request);
            result.response.leaderFee.should.be.equal(20.002748737228615);
            result.response.subscriberFee.should.be.equal(13.335165824819079);
        });
    });
});
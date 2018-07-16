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

    let state = {
        '$class': 'org.accordproject.cicero.contract.AccordContractState',
        'stateId': '1'
    };

    beforeEach( async function() {
        template = await Template.fromDirectory(rootDir);
        clause = new Clause(template);
        clause.parse(clauseText);
        engine = new Engine();
    });

    describe('#SaaS Introduction Clause', async function() {

        it('should produce correct result', async function() {
            const request = {
                $class: 'io.clause.samples.saasintroduction.Request'
            };
            const result = await engine.execute(clause, request, state);
            result.should.not.be.null;
        });
    });
});
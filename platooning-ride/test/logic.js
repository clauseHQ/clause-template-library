/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Template = require('cicero-core').Template;
const Clause = require('cicero-core').Clause;
const Engine = require('cicero-engine').Engine;

const ModelManager = require('composer-common').ModelManager;
const Serializer = require('composer-common').Serializer;
const Factory = require('composer-common').Factory;
const fs = require('fs');
const path = require('path');

const chai = require('chai');
chai.should();
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
const moment = require('moment');

describe('Logic', () => {

    const rootDir = path.resolve(__dirname, '..');
    const clauseText = fs.readFileSync(path.resolve(rootDir, 'sample.txt'), 'utf8');

    let template;
    let clause;
    let engine;    

    beforeEach( async function() {
        template = await Template.fromDirectory(rootDir);
        clause = new Clause(template);
        console.log(clause.data);
        engine = new Engine();    
    });
    
    describe('#EndPlatoon', async function() {

        it.skip('should produce correct result', async function() {
            const request = {};
            request.$class = 'io.clause.poc.platooning.EndPlatoon';
            request.platoon = 'resource:io.clause.poc.platooning.Platoon#1'
            request.transactions = [];
            const result = await engine.execute(clause, request);
            result.should.not.be.null;
        });
    });
});
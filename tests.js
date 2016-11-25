/*
 Copyright (C) 2016 Innotrade GmbH <https://innotrade.com>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

const expect = require("chai").expect;
const ClientBuilder = require("./index.js");

var client;

describe('Promise based API', () => {
    describe('connect', () => {
        it('opening & login', (done) => {
            ClientBuilder({
                username: 'guest',
                password: 'guest'
            }).then((c) => {
                client = c;
                done();
            });
        });
    });

    describe('making requests', () => {
        it('SPARQL query (OK)', (done) => {
            client.query('EnapsoUnits', 'SELECT ?v WHERE {?s ?p ?v} LIMIT 5').then((response) => {
                done();
            });
        });
        it('SPARQL query (403)', (done) => {
            client.query('EnapsoSoftwareCore', 'SELECT ?v WHERE {?s ?p ?v} LIMIT 5').catch((err) => {
                expect(403).to.equal(err.status);
                done();
            });
        });
    });

    describe('disconnect', () => {
        it('close', (done) => {
            client.close().then(done);
        });
    });
});
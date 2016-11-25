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

const HttpClient = require('enapso-client-js').HttpClient;
const r = require('request');

module.exports = (config = {}) => {
    let endpointURL = config.endpoint || 'https://dash.innotrade.com/sparql';

    return new Promise((resolve, reject) => {
        let conn = new HttpClient({
            url: config.url || 'https://dash.innotrade.com/http',
            username: config.username || 'guest',
            password: config.password || 'guest',
            autoSyncTimeout: config.autoSyncTimeout || 10000
        });

        conn.open()
            .then(() => {
                return conn.login();
            }).then(() => {
                resolve({
                    query: (ontologyAlias, query) => {
                        return new Promise((resolve, reject) => {
                            r({
                                url: endpointURL + `?ontologyAlias=${encodeURIComponent(ontologyAlias)}&query=${encodeURIComponent(query)}`,
                                headers: {
                                    'Accept': 'application/sparql-results+json',
                                    'ConnectionID': conn.getId()
                                }
                            }, (err, response, body) => {
                                if (err) reject(err);
                                else if (200 == response.statusCode) {
                                    resolve(JSON.parse(body));
                                } else {
                                    err = new Error(body);
                                    err.status = response.statusCode;
                                    reject(err);
                                }
                            })
                        });
                    },
                    close: () => {
                        return conn.close();
                    }
                });
            }).catch(reject);
    });
}
// Innotrade Enapso GraphDB Admin
// (C) Copyright 2019 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const request = require('request-promise');

// require the Enapso GraphDB Client package
const { getClassSchemaMeta, buildSelectQuery } = require('../enapso-sparql-tools')

const EnapsoSPARQLJS = {

	mGraphDBEndpoint: null,

    getClassSchema: async function(aOptions) {
        aOptions = aOptions || {};

		// build the "class schema reader" header and triples
		const classSchemaMeta = getClassSchemaMeta(aOptions.classIRI, aOptions.context)

		// build the class schema reader query
		let classSchemaQuery = buildSelectQuery(classSchemaMeta.headers, classSchemaMeta.triples)

		// perform the class reader query
		let queryResult = await this.mGraphDBEndpoint.query(classSchemaQuery)

		// transform the class reader query results to a convenient result set
		let result = this.mGraphDBEndpoint.transformBindingsToResultSet(queryResult, {
			// dropPrefixes: true
			// replacePrefixes: true
		});
		
		return result;
    }

}

module.exports = EnapsoSPARQLJS;

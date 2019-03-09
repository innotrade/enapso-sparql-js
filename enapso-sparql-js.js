// Innotrade Enapso SPARQL JS
// (C) Copyright 2019 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const request = require('request-promise');

// require the Enapso GraphDB Client package
const { getClassSchemaMeta, getIndividualsMeta, buildSelectQuery } =
	require('../enapso-sparql-tools')

const EnapsoSPARQLJS = {

	mGraphDBEndpoint: null,

	getClassSchema: async function (aOptions) {
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
	},

	getIndividuals: async function (aOptions) {
		aOptions = aOptions || {};

		// build the "class schema reader" header and triples
		const classSchemaMeta = getClassSchemaMeta(aOptions.classIRI, aOptions.context)

		// build the class schema reader query
		let classSchemaQuery = buildSelectQuery(classSchemaMeta.headers, classSchemaMeta.triples)

		// perform the class reader query
		let classResult = await this.mGraphDBEndpoint.query(classSchemaQuery)

		// log the "class schema" to the console
		classResult = this.mGraphDBEndpoint.transformBindingsToResultSet(classResult, {
			// dropPrefixes: true
		});

		// build the "read individuals" header and triples
		let individualsMeta = await getIndividualsMeta(classResult
			// optionally limit the fields to he desired ones
			// , ['firstName', 'lastName']
		)

		// build the "read individuals" reader query
		let individualsQuery = await buildSelectQuery(individualsMeta.headers, individualsMeta.triples)

		// perform the "read individuals" query
		let individualsResult = await this.mGraphDBEndpoint.query(individualsQuery)

		individualsResult = this.mGraphDBEndpoint.transformBindingsToResultSet(individualsResult, {
			// dropPrefixes: true
			replacePrefixes: true
		});

		return individualsResult;
	}

}

module.exports = EnapsoSPARQLJS;

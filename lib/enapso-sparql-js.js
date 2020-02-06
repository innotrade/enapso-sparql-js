// Innotrade Enapso SPARQL JS
// (C) Copyright 2019 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const request = require('request-promise');

// require the Enapso GraphDB Client package
const
	{ EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client'),
	{ EnapsoLogger } = require('@innotrade/enapso-logger'),
	{
		ClassCache, Class,
		Generator, Property,
		Prefix, PrefixManager
	} = require('@innotrade/enapso-sparql-tools')
	;


class EnapsoSPARQLJS {

	constructor() {

	}

	init() {
		// instantiate a prefix manager
		this.enPrefixManager = new EnapsoSPARQLTools.PrefixManager(EDO_PREFIXES);

		// in case no prefix is given for a certain resource identifier use the EDO: here
		this.enPrefixManager.setDefaultPrefix(PREFIX_EDO);

		// create a SPARQL generator using the prefix manager
		this.enSPARQL = new EnapsoSPARQLTools.Generator({
			prefixManager: this.enPrefixManager
		});

		// instantiate a GraphDB connector and connect to GraphDB
		this.graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
			baseURL: GRAPHDB_BASE_URL,
			repository: GRAPHDB_REPOSITORY,
			prefixes: this.enPrefixManager.getPrefixesForConnector()
		});

		// import all classes into memory
		this.classCache = await this.buildClassCache();
	}

}

module.exports = {
	EnapsoSPARQLJS
};

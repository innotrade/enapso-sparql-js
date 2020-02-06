// Innotrade Enapso SPARQL JS
// (C) Copyright 2019 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

// require the Enapso GraphDB Client package
const
	{ EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client'),
	{ EnapsoLogger } = require('@innotrade/enapso-logger'),
	{ ensptools } = require('../index');
;


class EnapsoSPARQLJS {

	constructor() {

	}

	// builds the class cache for all or selected classes
	async buildClassCache() {
		let classCache = new EnapsoSPARQLTools.ClassCache();

		// get all classes of the database
		let classes = await this.getAllClasses();

		// iterate through all returned classes
		for (let clsRec of classes.records) {

			let className = clsRec.class;
			// get the properties of the given class
			res = await this.getClassProperties(className);

			// generate an in-memory class of the retrieved properties
			let cls = this.generateClassFromClassProperties(NS_EDO, className, res);

			// add the class to the cache
			classCache.addClass(cls);
		}

		return classCache;
	}

	async init() {
		// instantiate a prefix manager
		this.enPrefixManager = new ensptools.PrefixManager(EDO_PREFIXES);

		// in case no prefix is given for a certain resource identifier use the EDO: here
		this.enPrefixManager.setDefaultPrefix(PREFIX_EDO);

		// create a SPARQL generator using the prefix manager
		this.enSPARQL = new ensptools.Generator({
			prefixManager: this.enPrefixManager
		});

		// instantiate a GraphDB connector and connect to GraphDB
		this.graphDBEndpoint = new ensptools.Endpoint({
			baseURL: GRAPHDB_BASE_URL,
			repository: GRAPHDB_REPOSITORY,
			prefixes: this.enPrefixManager.getPrefixesForConnector()
		});

		// import all classes into memory
		this.classCache = await this.buildClassCache();
	}

}

module.exports = {
	EnapsoSPARQLJS,
	enspjs: {
		EnapsoSPARQLJS
	}
};

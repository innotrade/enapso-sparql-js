// Innotrade Enapso SPARQL JS
// (C) Copyright 2019 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

// require the Enapso GraphDB Client
const EnapsoGraphDBClient = require("enapso-graphdb-client");
// require the Enapso SPARQL JS
const EnapsoSPARQLJS = require("../lib/enapso-sparql-js");

// connection data to the running GraphDB instance
const
	GRAPHDB_BASE_URL = 'http://localhost:7200',
	GRAPHDB_REPOSITORY = 'Test',
	GRAPHDB_USERNAME = 'Test',
	GRAPHDB_PASSWORD = 'Test',
	GRAPHDB_CONTEXT_TEST = 'http://ont.enapso.com/test'

// the default prefixes for all SPARQL queries
const GRAPHDB_DEFAULT_PREFIXES = [
	EnapsoGraphDBClient.PREFIX_OWL,
	EnapsoGraphDBClient.PREFIX_RDF,
	EnapsoGraphDBClient.PREFIX_RDFS
];

console.log("Enapso SPARQL JS Demo");

const EnapsoSPARQLJSDemo = {

	graphDBEndpoint: null,
	authentication: null,

	createEndpoint: async function () {
		// instantiate a new GraphDB endpoint
		return new EnapsoGraphDBClient.Endpoint({
			baseURL: GRAPHDB_BASE_URL,
			repository: GRAPHDB_REPOSITORY,
			prefixes: GRAPHDB_DEFAULT_PREFIXES
		});
	},

	login: async function () {
		// login into GraphDB using JWT
		let lRes = await this.graphDBEndpoint.login(
			GRAPHDB_USERNAME,
			GRAPHDB_PASSWORD
		);
		return lRes;
	},

	demoGetClassSchema: async function (aOptions) {
		var lRes = await EnapsoSPARQLJS.getClassSchema({
			classIRI: "http://ont.enapso.com/test#Person",
			context: "http://ont.enapso.com/test"
		});
		console.log("\nClass Schema: " + JSON.stringify(lRes, null, 2));
	},

	demoGetIndividuals: async function (aOptions) {
		var lRes = await EnapsoSPARQLJS.getIndividuals({
			classIRI: "http://ont.enapso.com/test#Person",
			context: "http://ont.enapso.com/test"
		});
		console.log("\nIndividuals: " + JSON.stringify(lRes, null, 2));
	},

	demo: async function () {
		this.graphDBEndpoint = await this.createEndpoint();
		this.authentication = await this.login();
		// verify authentication
		if (!this.authentication.success) {
			console.log("\nLogin failed:\n" +
				JSON.stringify(this.authentication, null, 2));
			return;
		}
		console.log("\nLogin successful");
		EnapsoSPARQLJS.mGraphDBEndpoint = this.graphDBEndpoint;

		await this.demoGetClassSchema();
		await this.demoGetIndividuals();
	}
}

EnapsoSPARQLJSDemo.demo();
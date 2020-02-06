// Innotrade Enapso SPARQL JS
// (C) Copyright 2019 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

// require the Enapso GraphDB Client
const EnapsoGraphDBClient = require("@innotrade/enapso-graphdb-client");
// require the Enapso SPARQL JS
const { enspjs } = require("../index");

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

class EnapsoSPARQLJSDemo {

	async demo() {
		console.log('Hello World!');
	}

}

new EnapsoSPARQLJSDemo().demo();
// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

// require the Enapso GraphDB Client package
const
	{ EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client'),
	{ EnapsoLogger } = require('@innotrade/enapso-logger'),
	{ ensptools } = require('@innotrade/enapso-sparql-tools'),
	{ EnapsoORM, EnapsoGraphDBAdapter } = require('@innotrade/enapso-orm')
	;

// connection data to the running GraphDB instance
const
	GRAPHDB_BASE_URL = 'http://localhost:7200',
	GRAPHDB_REPOSITORY = 'enapso-dev',
	GRAPHDB_USERNAME = 'admin',
	GRAPHDB_PASSWORD = 'root',
	GRAPHDB_CTX_JSAST = 'http://ont.enapso.com/jsast'

// the default prefixes for all SPARQL queries
const EDO_PREFIXES = [
	EnapsoGraphDBClient.PREFIX_OWL,
	EnapsoGraphDBClient.PREFIX_RDF,
	EnapsoGraphDBClient.PREFIX_RDFS
];

const
	NS_EDO = 'http://ont.enapso.co/jsast#',

	adapterConfig = {
		"class": EnapsoGraphDBAdapter,
		"id": "graphdb",
		"dbUrl": "http://localhost:7200/",
		"dbAlias": "local",
		"schema": "enapso-dev",

		"prefixes": // the default prefixes for all SPARQL queries
			[
				EnapsoGraphDBClient.PREFIX_OWL,
				EnapsoGraphDBClient.PREFIX_RDF,
				EnapsoGraphDBClient.PREFIX_RDFS,
				EnapsoGraphDBClient.PREFIX_XSD,
				{
					"prefix": "enjsast",
					"iri": NS_EDO
				}
			],

		"defaultPrefix": "enjsast",
		"defaultNamespace": NS_EDO
	};


class EnapsoSPARQLJS {

	constructor() {
		this.orm = null;
	}

	async init() {
		// instantiate the ORM with the desired DB adapters
		this.orm = new EnapsoORM();

		// instantiate the MongoDB Adapter with the require connection configuration
		this.adapter = new EnapsoGraphDBAdapter(
			adapterConfig
		);

		// add the adapter to the ORM
		this.orm.addAdapter({
			"id": adapterConfig.id,
			"adapter": this.adapter
		});

		await this.adapter.connect();
		// await adapter.login("admin", "root");
		this.endpoint = this.adapter.graphDBEndpoint;

		console.log('done');
	}

	async loadClasses() {
/*
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX enjsast: <http://ont.enapso.com/jsast#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
*/
		let sparql = `
select distinct
	?class ?restriction ?property  ?value ?some ?only ?type ?exactly ?min ?max 
	# ?propertyType ?range
where {
	# specify the JS AST graph
	graph <http://ont.enapso.com/jsast> {

		# get root node of class declaration
		# bind( enjsast:ArrayExpression as ?class ) .
		?class a owl:Class .
				
		# get all subClassOf specifications
		?class rdfs:subClassOf ?subClassOf .

		{   # ?subClassOf is a complex class restriction?
			?subClassOf owl:unionOf ?unionOf .
			bind( "unionOfType" as ?restriction ) .
			optional { 
				?unionOf rdf:rest*/rdf:first ?unionItem .
				optional { 
					?unionItem owl:onProperty ?property .
					# ?property a ?propertyType .
					optional {
						?unionItem owl:hasValue ?value .
						bind( "unionOfValue" as ?restriction )
					}
					optional { ?unionItem owl:someValuesFrom ?some }
				}
			}
		}
		
		union
		
		{	# ?subClassOf is simple property restriction?
			?subClassOf owl:onProperty ?property .
			# ?property a ?propertyType .
			optional { ?subClassOf owl:hasValue ?value }
			optional { ?subClassOf owl:someValuesFrom ?some }
			bind( if(bound(?value),"value","type") as ?restriction )
			optional {
				?subClassOf owl:allValuesFrom ?onlyEval .
				# ?onlyEval could be a direct type or a collection, if just type return it as ?only
				bind( ?onlyEval as ?only )
				optional {
					?onlyEval owl:unionOf ?unionOfOnly .
					?unionOfOnly rdf:rest*/rdf:first ?onlyItem .
					# if it's a collection, pass "unionOfOnly" as restriction and all item as ?only
					bind( ?onlyItem as ?only )
					bind( "unionOfOnly" as ?restriction ) .
				}
			}
			optional { ?subClassOf owl:onClass ?type }
			optional { ?subClassOf owl:qualifiedCardinality ?exactly }
			optional { ?subClassOf owl:minCardinality ?min }
			optional { ?subClassOf owl:maxCardinality ?max }
			optional {
				?subClassOf owl:onDataRange ?rangeEval .
				# ?rangeEval could be a direct type or a collection, if just type return it as ?range
				bind( ?rangeEval as ?type )
				optional {
					?rangeEval owl:unionOf ?unionOfRange .
					?unionOfRange rdf:rest*/rdf:first ?rangeItem .
					# if it's a collection, pass "unionOfRange" as restriction and all item as ?range
					bind( ?rangeItem as ?type ) .
					bind( "unionOfType" as ?restriction )
				}
			}
		}
	}
}
order by
	?class ?onProperty
`;
		let res = await this.adapter.sparqlQuery(sparql, {});
		console.log(JSON.stringify(res, null, 2));
	}

}

module.exports = {
	EnapsoSPARQLJS,
	enspjs: {
		EnapsoSPARQLJS
	}
};

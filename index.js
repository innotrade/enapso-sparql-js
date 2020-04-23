// Innotrade Enapso - SPARQL JS Toolbox
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Authors: Alexander Schulze

const 
	{ EnapsoSPARQLJS } = require('./lib/enapso-sparql-js'),
	{ OntTriple } = require('./lib/ontTriple'),
	{ OntTripleStore } = require('./lib/ontTripleStore'),
	{ OntNode } = require('./lib/ontNode'),
	{ OntClass } = require('./lib/ontClass'),
	{ OntRestriction } = require('./lib/ontRestriction')
;

module.exports = {
	enspjs: {
		OntTriple, OntNode, OntClass, 
		OntTriple, OntTripleStore,
		OntRestriction,
		EnapsoSPARQLJS
	},
	OntTriple, OntNode, OntClass,
	OntTriple, OntTripleStore,
	OntRestriction,
	EnapsoSPARQLJS
}

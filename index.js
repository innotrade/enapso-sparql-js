// Innotrade Enapso - SPARQL JS Toolbox
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Authors: Alexander Schulze

const
	{ EnapsoSPARQLJS } = require('./lib/enapso-sparql-js'),
	{ OntTriple } = require('./lib/ontTriple'),
	{ OntTripleStore } = require('./lib/ontTripleStore'),
	{ OntNode } = require('./lib/ontNode'),
	{ ontBlankNode } = require('./lib/ontBlankNode'),
	{ ontNamedNode } = require('./lib/ontNamedNode'),
	{ OntClass } = require('./lib/ontClass'),
	{ OntIndividual } = require('./lib/ontIndividual'),
	{ OntRestriction } = require('./lib/ontRestriction'),
	{ OntValueRestriction } = require('./lib/ontValueRestriction')
	;

module.exports = {
	enspjs: {
		OntTriple, OntTripleStore,
		OntNode, ontBlankNode, ontNamedNode,
		OntClass, OntIndividual,
		OntRestriction, OntValueRestriction,
		EnapsoSPARQLJS
	},
	OntTriple, OntTripleStore,
	OntNode, ontBlankNode, ontNamedNode,
	OntClass, OntIndividual,
	OntRestriction, OntValueRestriction,
	EnapsoSPARQLJS
}

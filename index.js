// Innotrade Enapso - SPARQL JS Toolbox
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Authors: Alexander Schulze

const
	{ EnapsoSPARQLJS } = require('./lib/enapso-sparql-js'),
	{ OntEntity } = require('./lib/ontEntity'),
	{ OntTriple } = require('./lib/ontTriple'),
	{ OntTripleStore } = require('./lib/ontTripleStore'),
	{ OntNode } = require('./lib/ontNode'),
	{ ontBlankNode } = require('./lib/ontBlankNode'),
	{ ontNamedNode } = require('./lib/ontNamedNode'),
	{ OntClass } = require('./lib/ontClass'),
	{ OntDatatypeProperty } = require('./lib/ontDatatypeProperty'),
	{ OntObjectProperty } = require('./lib/ontObjectProperty'),
	{ OntIndividual } = require('./lib/ontIndividual'),
	{ OntRestriction } = require('./lib/ontRestriction'),
	{ OntValueRestriction } = require('./lib/ontValueRestriction'),
	{ OntOnlyRestriction } = require('./lib/ontOnlyRestriction'),
	{ OntSomeRestriction } = require('./lib/ontSomeRestriction'),
	{ OntMinRestriction } = require('./lib/ontMinRestriction'),
	{ OntMaxRestriction } = require('./lib/ontMaxRestriction'),
	{ OntExactlyRestriction } = require('./lib/ontExactlyRestriction'),
	{ OntAnnotation } = require('./lib/ontAnnotation')
	;

module.exports = {
	enspjs: {
		OntEntity, OntTriple, OntTripleStore,
		OntNode, ontBlankNode, ontNamedNode,
		OntDatatypeProperty, OntObjectProperty,
		OntClass, OntIndividual,
		OntRestriction, OntValueRestriction,
		OntOnlyRestriction, OntSomeRestriction,
		OntMinRestriction, OntMaxRestriction,
		OntExactlyRestriction, OntAnnotation,
		EnapsoSPARQLJS
	},
	OntEntity, OntTriple, OntTripleStore,
	OntNode, ontBlankNode, ontNamedNode,
	OntDatatypeProperty, OntObjectProperty,
	OntClass, OntIndividual,
	OntRestriction, OntValueRestriction,
	OntOnlyRestriction, OntSomeRestriction,
	OntMinRestriction, OntMaxRestriction,
	OntExactlyRestriction, OntAnnotation,
	EnapsoSPARQLJS
}

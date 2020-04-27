// Innotrade Enapso - SPARQL JS Toolbox
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Authors: Alexander Schulze

const
	{ EnapsoSPARQLJS } = require('./lib/enapso-sparql-js'),
	{ OntEntity } = require('./lib/ontEntity'),
	{ OntTriple } = require('./lib/ontTriple'),
	{ OntTripleStore } = require('./lib/ontTripleStore'),
	{ OntNode } = require('./lib/ontNode'),
	{ OntBlankNode } = require('./lib/ontBlankNode'),
	{ OntNamedNode } = require('./lib/ontNamedNode'),
	{ OntOntology } = require('./lib/ontOntology'),
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
	{ OntAnnotation } = require('./lib/ontAnnotation'),
	{ OntComment } = require('./lib/ontComment')
	;

module.exports = {
	enspjs: {
		OntEntity, OntTriple, OntTripleStore,
		OntNode, OntBlankNode, OntNamedNode,
		OntDatatypeProperty, OntObjectProperty,
		OntOntology, OntClass, OntIndividual,
		OntRestriction, OntValueRestriction,
		OntOnlyRestriction, OntSomeRestriction,
		OntMinRestriction, OntMaxRestriction,
		OntExactlyRestriction, OntAnnotation,
		OntComment,
		EnapsoSPARQLJS
	},
	OntEntity, OntTriple, OntTripleStore,
	OntNode, OntBlankNode, OntNamedNode,
	OntDatatypeProperty, OntObjectProperty,
	OntOntology, OntClass, OntIndividual,
	OntRestriction, OntValueRestriction,
	OntOnlyRestriction, OntSomeRestriction,
	OntMinRestriction, OntMaxRestriction,
	OntExactlyRestriction, OntAnnotation, 
	OntComment,
	EnapsoSPARQLJS
}

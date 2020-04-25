// Innotrade Enapso SPARQL JS - Blank Node
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntNode } = require('./ontNode')
	;


class OntBlankNode extends OntNode {

	static id = 0;

	constructor(args) {
		super(args);
		this.setIri({ iri: '_:b' + String(OntBlankNode.id++) });
	}

}

module.exports = {
	OntBlankNode
}
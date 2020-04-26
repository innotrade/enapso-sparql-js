// Innotrade Enapso SPARQL JS - Named Node
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntNode } = require('./ontNode')
	;


class OntNamedNode extends OntNode {

	constructor(args) {
		super(args);
		// this.setIri({iri: args.iri});
	}

}

module.exports = {
	OntNamedNode
}
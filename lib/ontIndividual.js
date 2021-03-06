// Innotrade Enapso SPARQL JS - Named Node
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntNode } = require('./ontNode')
	;


class OntIndividual extends OntNode {

	static id = 0;

	constructor(args) {
		super(args);
		this.setIri(args.iri);
	}

}

module.exports = {
	OntIndividual
}
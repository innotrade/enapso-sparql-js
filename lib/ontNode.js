// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntTriple } = require('./ontTriple'),
	{ OntTripleStore } = require('./ontTripleStore')
	;


class OntNode {

	constructor(args) {
		this.iri = args.iri || null;
		this.context = args.context || null;
		this.tripleStore = new OntTripleStore(args.context);
	}

	getIri() {
		return this.iri;
	}

	setIri(args) {
		this.iri = args.iri;
	}

	getContext() {
		return this.context;
	}

	getTripleStore() {
		return this.tripleStore;
	}

	addTriple(triple) {
		this.tripleStore.addTriple(triple);
	}

	getTurtle() {
		return this.tripleStore.getTurtle();
	}

}

module.exports = {
	OntNode
}
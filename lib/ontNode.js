// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntTriple } = require('./ontTriple'),
	{ OntTripleStore } = require('./ontTripleStore')
	;


class OntNode {

	constructor(args) {
		this.iri = args.iri || null;
		this.context = args.context || null;
		this.tripleStore = new OntTripleStore({
			context: args.context
		});
		this.annotations = new OntTripleStore({
			context: args.context
		});
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

	getTriples() {
		return this.tripleStore.getTriples().concat(this.annotations.getTriples());
	}
	
	addTriple(args) {
		return this.tripleStore.addTriple({ triple: args.triple });
	}

	addTriples(args) {
		return this.tripleStore.addTriples({ triples: args.triples });
	}

	getTurtle() {
		let allTriples = new OntTripleStore({});
		allTriples.addTriples({
			triples: this.tripleStore.getTriples()
		});
		allTriples.addTriples({
			triples: this.annotations.getTriples()
		});
		return allTriples.getTurtle();
	}

	addAnnotation(args) {
		return this.annotations.addTriples({
			triples: args.annotation.getTriples()
		});
	}

}

module.exports = {
	OntNode
}
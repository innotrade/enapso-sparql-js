// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

class OntTripleStore {

	constructor(args) {
		this.context = args.context;
		this.triples = [];
	}

	addTriple(args) {
		let triple = args.triple;
		if (!triple.context && this.context) {
			triple.context = this.context;
		}
		this.triples.push(triple);
	}

	addTriples(args) {
		this.triples = this.triples.concat(args.triples);
	}

	getTriples() {
		return this.triples;
	}

	getTurtle() {
		let ttl = '';
		for (let triple of this.triples) {
			ttl += triple.getTurtle() + '\n';
		}
		return ttl;
	}
}

module.exports = {
	OntTripleStore
}
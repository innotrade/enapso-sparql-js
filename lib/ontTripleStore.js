// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

class OntTripleStore {

	constructor(context) {
		this.context = context;
		this.tripleStore = [];
	}

	addTriple(triple) {
		if (!triple.context && this.context) {
			triple.context = this.context;
		}
		this.tripleStore.push(triple);
	}

	getTurtle() {
		let ttl = '';
		for (let triple of this.tripleStore) {
			ttl += triple.getTurtle() + ' .\n';
		}
		return ttl;
	}
}

module.exports = {
	OntTripleStore
}
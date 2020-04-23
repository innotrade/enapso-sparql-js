// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

class OntTripleStore {

	constructor() {
		this.tripleStore = [];
	}

	addTriple(triple) {
		this.tripleStore.push(triple);
	}

	getTurtle() {
		let ttl = '';
		for(let triple of this.tripleStore) {
			ttl += triple.getTurtle() + ' .\n';
		}
		return ttl;
	}
}

module.exports = {
	OntTripleStore
}
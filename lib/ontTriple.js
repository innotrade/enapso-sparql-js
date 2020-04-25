// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

class OntTriple {

	constructor(args) {
		this.subject = args.subject;
		this.predicate = args.predicate;
		this.object = args.object;
		this.context = args.context;
	}

	getTurtle() {
		return (this.subject + ' ' + this.predicate + ' ' + this.object + ' (' + this.context + ')');
	}
}

module.exports = {
	OntTriple
}
// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

class OntTriple {

	constructor(subject, predicate, object, context) {
		this.subject = subject;
		this.predicate = predicate;
		this.object = object;
		this.context = context;
	}

	getTurtle() {
		return (this.subject + ' ' + this.predicate + ' ' + this.object);
	}
}

module.exports = {
	OntTriple
}
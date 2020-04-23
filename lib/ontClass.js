// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntNode } = require('./ontNode'),
	{ OntTriple } = require('./ontTriple')
	;

class OntClass extends OntNode {

	constructor(className, superClassName) {
		super();
		this.className = className;
		this.setClassName(className);
		if (superClassName) {
			this.superClassName = superClassName;
			this.setSuperClassName(superClassName);
		}
	}

	setClassName(className) {
		this.addTriple(new OntTriple(className, "rdf:type", "owl:Class"));
	}

	setSuperClassName(superClassName) {
		this.addTriple(new OntTriple(this.className, "rdfs:superClassOf", superClassName));
	}

	addRestriction(restriction) {

	}

}

module.exports = {
	OntClass
}
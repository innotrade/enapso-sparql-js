// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntNode } = require('./ontNode'),
	{ OntTriple } = require('./ontTriple')
	;

class OntClass extends OntNode {

	constructor(args) {
		super(args);
		this.context = args.context;
		this.className = args.className;
		this.setClassName({ className: args.className });
		if (args.superClassName) {
			this.superClassName = args.superClassName;
			this.setSuperClassName({ superClassName: args.superClassName });
		}
	}

	getClassName() {
		return this.className;
	}

	setClassName(args) {
		this.addTriple({
			triple: new OntTriple({
				context: args.context ? args.context : this.context,
				subject: args.className,
				predicate: "rdf:type",
				object: "owl:Class"
			})
		});
	}

	getSuperClassName() {
		return this.superClassName;
	}

	setSuperClassName(args) {
		this.addTriple({
			triple: new OntTriple({
				context: args.context ? args.context : this.context,
				subject: this.className,
				predicate: "rdfs:subClassOf",
				object: args.superClassName
			})
		});
	}

	addRestriction(args) {
		// a restriction is added to a class via a subClassOf triple
		let triples = [
			this.addTriple({
				triple: new OntTriple({
					context: args.context ? args.context : this.context,
					subject: this.className,
					predicate: "rdfs:subClassOf",
					object: args.restriction.getIri()
				})
			})
		];
		triples = triples.concat(
			this.addTriples({ triples: args.restriction.getTriples() })
		);
		return triples;
	}

}

module.exports = {
	OntClass
}
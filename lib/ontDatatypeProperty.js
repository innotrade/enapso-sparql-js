// Innotrade Enapso SPARQL JS - Data Property
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntNamedNode } = require('./ontNamedNode'),
	{ OntTriple } = require('./ontTriple')
	;

class OntDatatypeProperty extends OntNamedNode {

	constructor(args) {
		super(args);

		this.addTriple({
			triple: new OntTriple({
				"subject": this.getIri(),
				"predicate": "rdf:type",
				"object": "owl:DatatypeProperty"
			})
		});
		
		if (true/*args.childOfTopDataProperty*/) {
			this.addTriple({
				triple: new OntTriple({
					"subject": this.getIri(),
					"predicate": "rdfs:subPropertyOf",
					"object": "owl:topDataProperty"
				})
			});
		}
	}

}

module.exports = {
	OntDatatypeProperty
}
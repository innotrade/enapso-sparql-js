// Innotrade Enapso SPARQL JS - Data Property
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntNamedNode } = require('./ontNamedNode'),
	{ OntTriple } = require('./ontTriple')
	;

class OntOntology extends OntNamedNode {

	constructor(args) {
		super(args);

		this.addTriple({
			triple: new OntTriple({
				"subject": this.getIri(),
				"predicate": "rdf:type",
				"object": "owl:Ontology"
			})
		});
		
		if (args.versionIri) {
			this.addTriple({
				triple: new OntTriple({
					"subject": this.getIri(),
					"predicate": "owl:versionIRI",
					"object": args.versionIri
				})
			});
		}
	}

}

module.exports = {
	OntOntology
}
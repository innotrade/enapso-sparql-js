// Innotrade Enapso SPARQL JS - Value Restriction
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze
const
	{ OntRestriction } = require('./ontRestriction'),
	{ OntTriple } = require('./ontTriple')
	;

class OntExactlyRestriction extends OntRestriction {

	constructor(args) {
		super(args);
		this.addTriples({
			triples: [
				new OntTriple({
					"subject": this.getIri(),
					"predicate": "owl:onProperty",
					"object": args.property
				}),
				new OntTriple({
					"subject": this.getIri(),
					"predicate": "owl:qualifiedCardinality",
					"object": '"' + args.cardinality + '"^^xsd:nonNegativeInteger'
				}),
				new OntTriple({
					"subject": this.getIri(),
					"predicate": "owl:onClass",
					"object": args.value
				})
			]
		});
	}

}

module.exports = {
	OntExactlyRestriction
}
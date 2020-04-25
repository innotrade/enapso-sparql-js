// Innotrade Enapso SPARQL JS - Class Restriction
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze


class OntRestriction extends OntNode {

	constructor(args) {
		super(args)
		this.addTriple(args.className, 'rdf:type', 'owl:Restriction');
	}

}

module.exports = {
	OntRestriction
}
// Innotrade Enapso SPARQL JS - Class Restriction
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze
const
    { OntBlankNode } = require('./ontBlankNode'),
    { OntTriple } = require('./ontTriple')
    ;

class OntRestriction extends OntBlankNode {

    constructor(args) {
        super(args)
        this.addTriple({
            triple : new OntTriple({
                "subject": this.getIri(),
                "predicate": "rdf:type",
                "object": "owl:Restriction"
            })
        });
        // if the triples are already delivered, add them to the store
        if(args.triples) {
            this.addTriples(args.triples);
        }
    }

}

module.exports = {
    OntRestriction
}
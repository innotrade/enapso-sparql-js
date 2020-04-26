// Innotrade Enapso SPARQL JS - Object Property
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
    { OntNamedNode } = require('./ontNamedNode'),
    { OntTriple } = require('./ontTriple')
    ;

class OntObjectProperty extends OntNamedNode {

    constructor(args) {
        super(args);

        this.addTriple({
            triple: new OntTriple({
                "subject": this.getIri(),
                "predicate": "rdf:type",
                "object": "owl:ObjectProperty"
            })
        });

        if (true/*args.childOfTopObjectProperty*/) {
            this.addTriple({
                triple: new OntTriple({
                    "subject": this.getIri(),
                    "predicate": "rdfs:subPropertyOf",
                    "object": "owl:topObjectProperty"
                })
            });
        }

        
    }

}

module.exports = {
    OntObjectProperty
}
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

    setClassName(args) {
        this.addTriple(
            new OntTriple({
                context: args.context ? args.context : this.context,
                subject: args.className,
                predicate: "rdf:type",
                object: "owl:Class"
            })
        );
    }

    setSuperClassName(args) {
        this.addTriple(
            new OntTriple({
                context: args.context ? args.context : this.context,
                subject: this.className,
                predicate: "rdfs:subClassOf",
                object: args.superClassName
            })
        );
    }

    addRestriction(args) {
        this.addTriple(
            new OntTriple({
                context: args.context ? args.context : this.context,
                subject: this.className,
                predicate: "rdfs:subClassOf",
                object: args.restriction
            })
        );
    }

}

module.exports = {
    OntClass
}
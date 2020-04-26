// Innotrade Enapso SPARQL JS - Entity (part of a triple)
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

class OntEntity {

    static IRI = "$IRI";
    static PREFIXED_NAME = "$PN";
    static CONTEXT = "$CTX";

    constructor(args) {
        this.value = args.value;
        this.type = args.type;
    }

    toString() {
        if (this.type === OntEntity.IRI) {
            return '<' + this.value + '>';
        } else if (this.type === OntEntity.PREFIXED_NAME) {
            return this.value
        } else {
            switch (typeof this.value) {
                case "string": return '"' + value + '"';
            }
            return this.value;
        }
    }
}

module.exports = {
    OntEntity
}
// Innotrade Enapso SPARQL JS - Annotation
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntNode } = require('./ontNode')
	;

class OntAnnotation extends OntNode {

	constructor(args) {
        super(args);
        this.addTriple({triple: args.triple});
	}

}

module.exports = {
	OntAnnotation
}
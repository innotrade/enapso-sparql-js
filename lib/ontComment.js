// Innotrade Enapso SPARQL JS - Comment
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntTriple } = require('./ontTriple'),
	{ OntTripleStore } = require('./ontTripleStore')
	;


class OntComment extends OntNode {

	constructor(args) {
		super(args)
		this.addTriple(args.entity, 'rdfs:comment', args.comment);
	}

}

module.exports = {
	OntComment
}
// Innotrade Enapso SPARQL JS - Comment
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntNode } = require('./ontNode'),
	{ OntTriple } = require('./ontTriple')
	;


class OntComment extends OntNode {

	constructor(args) {
		super(args)
		this.addTriple({
			triple: new OntTriple({
				"subject": args.entity,
				"predicate": 'rdfs:comment',
				"object": args.comment
			})
		});
	}

}

module.exports = {
	OntComment
}
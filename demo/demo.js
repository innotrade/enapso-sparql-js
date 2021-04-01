// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

// require the Enapso GraphDB Client
const EnapsoGraphDBClient = require("@innotrade/enapso-graphdb-client");

// require the Enapso SPARQL JS
const
	{ enspjs, OntEntity, OntTriple, OntAnnotation,
		OntValueRestriction, OntOnlyRestriction, OntSomeRestriction,
		OntMinRestriction, OntMaxRestriction, OntExactlyRestriction } = require("../index");


console.log("Enapso SPARQL JS Demo\n(C) Copyright 2020 Innotrade GmbH Herzogenrath, NRW, Germany");

class EnapsoSPARQLJSDemo {

	async demo() {
/*
		// console.log(JSON.stringify(Array.prototype, null, 2));
		let ontClass = new enspjs.OntClass({
			"context": 'http://ont.enapso.com/enspjstest',
			"className": 'enecma:TestClass',
			"superClassName": 'enecma:Class'
		});

		let classNameRestriction = new OntValueRestriction({
			property: 'enecma:name',
			value: '"TestClass"'
		});
		// add the restriction to the class
		ontClass.addRestriction({
			restriction: classNameRestriction
		});

		let hasConstructorsRestriction = new OntExactlyRestriction({
			property: 'enecma:hasConstructors',
			value: 'enecma:TestConstructor',
			cardinality: 1
		});
		// add the restriction to the class
		ontClass.addRestriction({
			restriction: hasConstructorsRestriction
		});	

		let hasMethodsRestriction = new OntOnlyRestriction({
			property: 'enecma:hasMethods',
			value: 'enecma:TestMethod'
		});
		// add the restriction to the class
		ontClass.addRestriction({
			restriction: hasMethodsRestriction
		});

		// add a comment to the class
		let ontComment = new OntAnnotation({triple: new OntTriple({
			subject: 'enecma:TestClass',
			predicate: 'rdfs:comment',
			object: '"My comment for the new TestClass"@en'
		})});
		ontClass.addAnnotation({
			annotation: ontComment
		});

		console.log(ontClass.getTurtle());
		return;
*/
		let spjs = new enspjs.EnapsoSPARQLJS();
		await spjs.init();
		await spjs.loadClasses();
	}

}

new EnapsoSPARQLJSDemo().demo();
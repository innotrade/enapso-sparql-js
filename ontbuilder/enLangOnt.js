// Innotrade Enapso SPARQL JS
// (C) Copyright 2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ enspjs } = require("../index");

class EnapsoLanguageOnotology {

	constructor() {
		this.iri = 'http://ont.enapso.com/ecmascript';
		this.versionIri = 'http://ont.enapso.com/ecmascript/1.0.0';
		this.context = 'http://ont.enapso.com/ecmascript';
		this.prefix = 'enecma:';
	}

	addClass(args) {
		let className = args.className;

		this.parentClassName = className;
		this.classParent = new enspjs.OntClass({
			"className": this.prefix + className + '.Class',
			"superClassName": this.prefix + 'Class'
		});
		this.constructorParent = new enspjs.OntClass({
			"className": this.prefix + className + '.Constructor',
			"superClassName": this.prefix + 'Constructor'
		});
		this.methodParent = new enspjs.OntClass({
			"className": this.prefix + className + '.Method',
			"superClassName": this.prefix + 'Method'
		});
		this.propertyParent = new enspjs.OntClass({
			"className": this.prefix + className + '.Property',
			"superClassName": this.prefix + 'Property'
		});
		this.instanceParent = new enspjs.OntClass({
			"className": this.prefix + className + '.Instance',
			"superClassName": this.prefix + 'Instance'
		});
		this.argumentParent = new enspjs.OntClass({
			"className": this.prefix + className + '.Argument',
			"superClassName": this.prefix + 'Argument'
		});

		this.tripleStore.addTriples({ triples: this.classParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.constructorParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.methodParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.propertyParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.instanceParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.argumentParent.getTriples() });
	}

	addFunction(args) {
		let methodName = args.methodName;
		this.method = new enspjs.OntClass({
			"className": this.prefix + this.parentClassName + '.' + methodName,
			"superClassName": this.prefix + this.parentClassName + '.' + args.type
		});
		this.tripleStore.addTriples({ triples: this.method.getTriples() });
	}

	addMethod(args) {
		args.type = 'Method';
		this.addFunction(args);
	}

	addConstructor(args) {
		args.type = 'Constructor';
		args.methodName = args.methodName || 'constructor';
		this.addFunction(args);
	}

	createOntologySkeleton() {
		this.tripleStore = new enspjs.OntTripleStore({
			context: this.context
		});

		// ### Ontology ###

		this.ontology = new enspjs.OntOntology({
			"iri": '<' + this.iri + '>',
			"versionIri": '<' + this.versionIri + '>'
		});
		this.ontology.addAnnotation({
			annotation: new enspjs.OntComment({
				entity: this.ontology.getIri(),
				comment: '"Enapso Language Ontology"@en'
			})
		});
		this.ontology.addAnnotation({
			annotation: new enspjs.OntComment({
				entity: this.ontology.getIri(),
				comment: '"(C) Copyright Innotrade Herzogenrath, NRW, Germany"@en'
			})
		});

		// ### Data Properties ###

		this.dpName = new enspjs.OntDatatypeProperty({
			"iri": this.prefix + 'name'
		});

		// ### Object Properties ###

		this.opHasConstructors = new enspjs.OntObjectProperty({
			"iri": this.prefix + 'hasConstructors'
		});
		this.opHasMethods = new enspjs.OntObjectProperty({
			"iri": this.prefix + 'hasMethods'
		});
		this.opHasProperties = new enspjs.OntObjectProperty({
			"iri": this.prefix + 'hasProperties'
		});
		this.opHasDatatype = new enspjs.OntObjectProperty({
			"iri": this.prefix + 'hasDatatype'
		});
		this.opHasArgument = new enspjs.OntObjectProperty({
			"iri": this.prefix + 'hasArgument'
		});

		// ### Classes ###

		// Class Root Class
		this.classRoot = new enspjs.OntClass({
			"className": this.prefix + 'Class'
			// "superClassName": 'owl:Class'
		});
		// Method Root Class
		this.methodRoot = new enspjs.OntClass({
			"className": this.prefix + 'Method'
			// "superClassName": 'owl:Class'
		});
		// Constructor Root Class
		this.constructorRoot = new enspjs.OntClass({
			"className": this.prefix + 'Constructor'
			// "superClassName": 'owl:Class'
		});
		// Properties Root Class
		this.propertyRoot = new enspjs.OntClass({
			"className": this.prefix + 'Property'
			// "superClassName": 'owl:Class'
		});
		// Arguments Root Class
		this.argumentRoot = new enspjs.OntClass({
			"className": this.prefix + 'Argument'
			// "superClassName": 'owl:Class'
		});
		// Instance Root Class
		this.instanceRoot = new enspjs.OntClass({
			"className": this.prefix + 'Instance'
			// "superClassName": 'owl:Class'
		});
		// Literal Root Class
		this.literalRoot = new enspjs.OntClass({
			"className": this.prefix + 'Literal'
			// "superClassName": 'owl:Class'
		});

		// ontology header
		this.tripleStore.addTriples({ triples: this.ontology.getTriples() });
		// data properties
		this.tripleStore.addTriples({ triples: this.dpName.getTriples() });
		// object properties
		this.tripleStore.addTriples({ triples: this.opHasConstructors.getTriples() });
		this.tripleStore.addTriples({ triples: this.opHasMethods.getTriples() });
		this.tripleStore.addTriples({ triples: this.opHasProperties.getTriples() });
		this.tripleStore.addTriples({ triples: this.opHasDatatype.getTriples() });
		this.tripleStore.addTriples({ triples: this.opHasArgument.getTriples() });
		// root classes
		this.tripleStore.addTriples({ triples: this.classRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.methodRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.constructorRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.propertyRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.argumentRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.instanceRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.literalRoot.getTriples() });

		/*
		this.addClass("Ext.Base");
		this.addClass("Ext.Object");
		this.addClass("Ext.View");
		*/

		let cls = this.addClass({ "className": "Test" });
		this.addConstructor({});
		this.addMethod({ "methodName": "addItem" });
		this.addMethod({ "methodName": "deleteItem" });
		this.addMethod({ "methodName": "updateItem" });
		this.addMethod({ "methodName": "getItem" });

		console.log(this.tripleStore.getTurtle());
	}

}

let enlo = new EnapsoLanguageOnotology();
enlo.createOntologySkeleton();

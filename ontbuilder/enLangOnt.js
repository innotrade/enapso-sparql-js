// Innotrade Enapso SPARQL JS
// (C) Copyright 2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntTripleStore } = require('../lib/ontTripleStore'),
	{ OntOntology } = require('../lib/ontOntology'),
	{ OntClass } = require('../lib/ontClass'),
	{ OntDatatypeProperty } = require('../lib/ontDatatypeProperty'),
	{ OntObjectProperty } = require('../lib/ontObjectProperty'),
	{ OntValueRestriction } = require('../lib/ontValueRestriction'),
	{ OntOnlyRestriction } = require('../lib/ontOnlyRestriction'),
	{ OntSomeRestriction } = require('../lib/ontSomeRestriction'),
	{ OntMinRestriction } = require('../lib/ontMinRestriction'),
	{ OntMaxRestriction } = require('../lib/ontMaxRestriction'),
	{ OntExactlyRestriction } = require('../lib/ontExactlyRestriction'),
	{ OntComment } = require('../lib/ontComment')
	;

class EnapsoLanguageOntology {

	constructor(args) {
		let ontologyId = args.ontologyId;
		let prefix = args.prefix;
		this.ontologyComments = args.comments;
		this.iri = 'http://ont.enapso.com/' + ontologyId;
		this.versionIri = 'http://ont.enapso.com/' + ontologyId + '/1.0.0';
		this.context = 'http://ont.enapso.com/' + ontologyId;
		this.prefix = prefix + ':';
	}

	addModule(args) {
		let moduleName = args.moduleName;

		// module
		this.parentModuleName = moduleName;
		this.moduleParent = new OntClass({
			"className": this.prefix + moduleName + '.Module',
			"superClassName": this.prefix + 'Module'
		});
		// give the module a name
		let moduleNameRestriction = new OntValueRestriction({
			property: this.prefix + 'name',
			value: '"' + this.parentModuleName + '"'
		});
		this.moduleParent.addRestriction({ restriction: moduleNameRestriction });

		this.tripleStore.addTriples({ triples: this.moduleParent.getTriples() });
	}

	addClass(args) {
		let className = args.className;

		// class
		this.parentClassName = className;
		this.classParent = new OntClass({
			"className": this.prefix + className + '.Class',
			"superClassName": this.prefix + 'Class'
		});
		// give the class a name
		let classNameRestriction = new OntValueRestriction({
			property: this.prefix + 'name',
			value: '"' + this.parentClassName + '"'
		});
		this.classParent.addRestriction({ restriction: classNameRestriction });

		// constructor parent
		this.constructorParent = new OntClass({
			"className": this.prefix + className + '.Constructor',
			"superClassName": this.prefix + 'Constructor'
		});
		// add the methods restriction to the class
		let hasConstructorsRestriction = new OntOnlyRestriction({
			"property": this.prefix + "hasConstructors",
			"class": this.constructorParent.getClassName(),
		});
		this.classParent.addRestriction({ restriction: hasConstructorsRestriction });

		// method parent
		this.methodParent = new OntClass({
			"className": this.prefix + className + '.Method',
			"superClassName": this.prefix + 'Method'
		});
		// add the methods restriction to the class
		let hasMethodsRestriction = new OntOnlyRestriction({
			"property": this.prefix + "hasMethods",
			"class": this.methodParent.getClassName(),
		});
		this.classParent.addRestriction({ restriction: hasMethodsRestriction });

		// property parent
		this.propertyParent = new OntClass({
			"className": this.prefix + className + '.Property',
			"superClassName": this.prefix + 'Property'
		});
		// add the properties restriction to the class
		let hasPropertiesRestriction = new OntOnlyRestriction({
			"property": this.prefix + "hasProperties",
			"class": this.propertyParent.getClassName(),
		});
		this.classParent.addRestriction({ restriction: hasPropertiesRestriction });

		this.instanceParent = new OntClass({
			"className": this.prefix + className + '.Instance',
			"superClassName": this.prefix + 'Instance'
		});

		this.parentArgumentName = className + '.Argument';
		this.argumentParent = new OntClass({
			"className": this.prefix + this.parentArgumentName,
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
		this.methodName = args.methodName;
		// add new parent class for the method's or constructor's variants
		this.method = new OntClass({
			"className": this.prefix + this.parentClassName + '.' + this.methodName,
			"superClassName": this.prefix + this.parentClassName + '.' + args.type
		});
		// add the name to the method parent
		let funcNameRestriction = new OntValueRestriction({
			property: this.prefix + 'name',
			value: '"' + this.methodName + '"'
		});
		this.method.addRestriction({ restriction: funcNameRestriction });
		// add a comment if given
		if (args.comment) {
			this.method.addAnnotation({
				annotation: new OntComment({
					entity: this.method.getClassName(),
					comment: args.comment
				})
			});
		}

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

	addVariant(args) {
		this.variantName = args.variantName;
		this.methodVariant = new OntClass({
			"className": this.prefix + this.parentClassName + '.' + this.methodName + '.' + this.variantName,
			"superClassName": this.prefix + this.parentClassName + '.' + this.methodName
		});
		this.tripleStore.addTriples({ triples: this.methodVariant.getTriples() });
	}

	addArgument(args) {
		this.argumentName = args.name;
		this.argumentType = args.type;
		this.argument = new OntClass({
			"className": this.prefix + this.parentClassName + '.' + this.methodName + '.' + this.variantName + '.' + this.argumentName,
			"superClassName": this.prefix + this.parentArgumentName
		});
		// name of the argument
		let argNameRestriction = new OntValueRestriction({
			"property": this.prefix + 'name',
			"value": '"' + this.argumentName + '"'
		});
		this.argument.addRestriction({ restriction: argNameRestriction });
		// type of the argument
		let typeRestriction = new OntOnlyRestriction({
			"property": this.prefix + 'hasDatatype',
			"class": this.argumentType
		});
		this.argument.addRestriction({ restriction: typeRestriction });
		// optional order of the argument
		if (args.order) {
			let orderRestriction = new OntValueRestriction({
				"property": this.prefix + 'order',
				"value": '"' + args.order + '"^^xsd:NonNegativeInteger'
			});
			this.argument.addRestriction({ restriction: orderRestriction });
		}
		// optional comment of the argument
		if (args.comment) {
			this.argument.addAnnotation({
				annotation: new OntComment({
					entity: this.argument.getClassName(),
					comment: args.comment
				})
			});
		}
		this.tripleStore.addTriples({ triples: this.argument.getTriples() });
	}

	createOntologySkeleton() {
		this.tripleStore = new OntTripleStore({
			context: this.context
		});

		// ### Ontology ###

		this.ontology = new OntOntology({
			"iri": '<' + this.iri + '>',
			"versionIri": '<' + this.versionIri + '>'
		});
		if (this.ontologyComments) {
			for (let comment of this.ontologyComments) {
				this.ontology.addAnnotation({
					annotation: new OntComment({
						entity: this.ontology.getIri(),
						comment
					})
				});
			}
		}

		// ### Data Properties ###

		this.dpName = new OntDatatypeProperty({
			"iri": this.prefix + 'name'
		});

		// ### Object Properties ###

		this.opHasConstructors = new OntObjectProperty({
			"iri": this.prefix + 'hasConstructors'
		});
		this.opHasMethods = new OntObjectProperty({
			"iri": this.prefix + 'hasMethods'
		});
		this.opHasProperties = new OntObjectProperty({
			"iri": this.prefix + 'hasProperties'
		});
		this.opHasDatatype = new OntObjectProperty({
			"iri": this.prefix + 'hasDatatype'
		});
		this.opHasArgument = new OntObjectProperty({
			"iri": this.prefix + 'hasArgument'
		});

		// ### Classes ###

		// Class Root Class
		this.classRoot = new OntClass({
			"className": this.prefix + 'Class'
			// "superClassName": 'owl:Class'
		});
		// Method Root Class
		this.methodRoot = new OntClass({
			"className": this.prefix + 'Method'
			// "superClassName": 'owl:Class'
		});
		// Constructor Root Class
		this.constructorRoot = new OntClass({
			"className": this.prefix + 'Constructor'
			// "superClassName": 'owl:Class'
		});
		// Properties Root Class
		this.propertyRoot = new OntClass({
			"className": this.prefix + 'Property'
			// "superClassName": 'owl:Class'
		});
		// Arguments Root Class
		this.argumentRoot = new OntClass({
			"className": this.prefix + 'Argument'
			// "superClassName": 'owl:Class'
		});
		// Instance Root Class
		this.instanceRoot = new OntClass({
			"className": this.prefix + 'Instance'
			// "superClassName": 'owl:Class'
		});
		// Literal Root Class
		this.literalRoot = new OntClass({
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
	}

}

module.exports = {
	EnapsoLanguageOntology
}

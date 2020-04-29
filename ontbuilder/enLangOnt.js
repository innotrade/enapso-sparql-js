// Innotrade Enapso SPARQL JS
// (C) Copyright 2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const
	{ OntTriple } = require('../lib/ontTriple'),
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

	/*
	static SFX_MODULE = ".Module";
	static SFX_CLASS = ".Class";
	static SFX_INSTANCE = ".Instance";
	static SFX_METHOD = ".Method";
	static SFX_CONSTRUCTOR = ".Constructor";
	static SFX_VARIANT = ".Variant";
	static SFX_ARGUMENT = ".Argument";
	static SFX_RESULT = ".Result";
	static SFX_PROPERTY = ".Property";
	static SFX_LITERAL = ".Literal";
	*/
	static SFX_MODULE = ".mod";
	static SFX_CLASS = ".cls";
	static SFX_INSTANCE = ".inst";
	static SFX_METHOD = ".mthd";
	static SFX_CONSTRUCTOR = ".constr";
	static SFX_VARIANT = ".var";
	static SFX_ARGUMENT = ".arg";
	static SFX_RESULT = ".res";
	static SFX_PROPERTY = ".prop";
	static SFX_LITERAL = ".lit";

	constructor(args) {
		let ontologyId = args.ontologyId;
		let prefix = args.prefix;
		this.ontologyComments = args.comments;
		this.iri = 'http://ont.enapso.com/' + ontologyId;
		this.versionIri = 'http://ont.enapso.com/' + ontologyId + '/1.0.0';
		this.context = 'http://ont.enapso.com/' + ontologyId;
		this.prefix = prefix + ':';
	}

	// adds a module to the ontology
	addModule(args) {
		let moduleName = args.moduleName;

		// module
		this.parentModuleName = moduleName;
		this.moduleParent = new OntClass({
			"className": this.prefix + moduleName + EnapsoLanguageOntology.SFX_MODULE,
			"superClassName": this.prefix + 'Module'
		});
		// give the module a name
		let moduleNameRestriction = new OntValueRestriction({
			property: this.prefix + 'name',
			value: '"' + this.parentModuleName + '"'
		});
		this.moduleParent.addRestriction({ restriction: moduleNameRestriction });

		// we do not have a module constructors

		// method parent for the module
		this.methodParent = new OntClass({
			"className": this.prefix + moduleName + EnapsoLanguageOntology.SFX_METHOD,
			"superClassName": this.prefix + 'Method'
		});
		// add the methods restriction to the class
		let hasMethodsRestriction = new OntOnlyRestriction({
			"property": this.prefix + "hasMethods",
			"class": this.methodParent.getClassName(),
		});
		this.moduleParent.addRestriction({ restriction: hasMethodsRestriction });

		this.parentArgumentName = moduleName + EnapsoLanguageOntology.SFX_ARGUMENT,
			this.argumentParent = new OntClass({
				"className": this.prefix + this.parentArgumentName,
				"superClassName": this.prefix + 'Argument'
			});

		// add a comment if given
		if (args.comment) {
			this.moduleParent.addAnnotation({
				annotation: new OntComment({
					entity: this.moduleParent.getClassName(),
					comment: args.comment
				})
			});
		}

		this.tripleStore.addTriples({ triples: this.moduleParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.methodParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.argumentParent.getTriples() });
	}

	// adds a class to the ontology
	addClass(args) {
		let className = args.className;

		// class
		this.parentClassName = className;
		this.classParent = new OntClass({
			"className": this.prefix + className + EnapsoLanguageOntology.SFX_CLASS,
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
			"className": this.prefix + className + EnapsoLanguageOntology.SFX_CONSTRUCTOR,
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
			"className": this.prefix + className + EnapsoLanguageOntology.SFX_METHOD,
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
			"className": this.prefix + className + EnapsoLanguageOntology.SFX_PROPERTY,
			"superClassName": this.prefix + 'Property'
		});
		// add the properties restriction to the class
		let hasPropertiesRestriction = new OntOnlyRestriction({
			"property": this.prefix + "hasProperties",
			"class": this.propertyParent.getClassName(),
		});
		this.classParent.addRestriction({ restriction: hasPropertiesRestriction });

		this.instanceParent = new OntClass({
			"className": this.prefix + className + EnapsoLanguageOntology.SFX_INSTANCE,
			"superClassName": this.prefix + 'Instance'
		});

		// add a argument parent for this class
		this.parentArgumentName = className + EnapsoLanguageOntology.SFX_ARGUMENT;
		this.argumentParent = new OntClass({
			"className": this.prefix + this.parentArgumentName,
			"superClassName": this.prefix + 'Argument'
		});

		// add a result parent for this class
		this.parentResultName = className + EnapsoLanguageOntology.SFX_RESULT;
		this.resultParent = new OntClass({
			"className": this.prefix + this.parentResultName,
			"superClassName": this.prefix + 'Result'
		});

		// add a comment to the class if given
		if (args.comment) {
			this.methodParent.addAnnotation({
				annotation: new OntComment({
					entity: this.methodParent.getClassName(),
					comment: args.comment
				})
			});
		}

		this.tripleStore.addTriples({ triples: this.classParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.constructorParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.methodParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.propertyParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.instanceParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.argumentParent.getTriples() });
		this.tripleStore.addTriples({ triples: this.resultParent.getTriples() });
	}

	addFunction(args) {
		this.methodName = args.methodName;
		// add new parent class for the method's or constructor's variants
		let parentName = this['parent' + args.parentType + 'Name'];
		this.method = new OntClass({
			"className": this.prefix + parentName + '.' + this.methodName,
			"superClassName": this.prefix + parentName + args.type
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

	// adds a method directly for the module
	addModuleMethod(args) {
		args.parentType = 'Module';
		args.type = EnapsoLanguageOntology.SFX_METHOD, // 'Method';
			this.addFunction(args);
	}

	// adds a method for the current class
	addClassMethod(args) {
		args.parentType = 'Class';
		args.type = EnapsoLanguageOntology.SFX_METHOD, // 'Method';
			this.addFunction(args);
	}

	// adds a constructor for the current class
	addClassConstructor(args) {
		args.parentType = 'Class';
		args.type = EnapsoLanguageOntology.SFX_CONSTRUCTOR, // 'Constructor';
			args.methodName = args.methodName || 'constructor';
		this.addFunction(args);
	}

	addVariant(args) {
		this.variantName = args.variantName;
		let parentName = this['parent' + args.parentType + 'Name'];

		this.methodVariant = new OntClass({
			"className": this.prefix + parentName + '.' + this.methodName + '.' + this.variantName,
			"superClassName": this.prefix + parentName + '.' + this.methodName
		});
		this.tripleStore.addTriples({ triples: this.methodVariant.getTriples() });
	}

	addArgument(args) {
		this.argumentName = args.name;
		this.argumentType = args.type;
		let parentName = this['parent' + args.parentType + 'Name'];

		this.argument = new OntClass({
			"className": this.prefix + parentName + '.' + this.methodName + '.' + this.variantName + '.' + this.argumentName,
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

	addResult(args) {
		this.resultType = args.type;
		let parentName = this['parent' + args.parentType + 'Name'];

		this.result = new OntClass({
			"className": this.prefix + parentName + '.' + this.methodName + '.' + this.variantName,
			"superClassName": this.prefix + this.parentResultName
		});

		// type of the result
		let typeRestriction = new OntOnlyRestriction({
			"property": this.prefix + 'hasDatatype',
			"class": this.resultType
		});
		this.result.addRestriction({ restriction: typeRestriction });

		// optional comment of the result
		if (args.comment) {
			this.result.addAnnotation({
				annotation: new OntComment({
					entity: this.result.getClassName(),
					comment: args.comment
				})
			});
		}

		this.tripleStore.addTriples({ triples: this.result.getTriples() });
	}

	createEcmaScriptBasics() {

		// Instances
		this.stringInstance = new OntClass({
			"className": this.prefix + 'String' + EnapsoLanguageOntology.SFX_INSTANCE,
			"superClassName": this.prefix + "Instance"
		});		
		this.numberInstance = new OntClass({
			"className": this.prefix + 'Number' + EnapsoLanguageOntology.SFX_INSTANCE,
			"superClassName": this.prefix + "Instance"
		});		
		this.booleanInstance = new OntClass({
			"className": this.prefix + 'Boolean' + EnapsoLanguageOntology.SFX_INSTANCE,
			"superClassName": this.prefix + "Instance"
		});		
		this.dateInstance = new OntClass({
			"className": this.prefix + 'Date' + EnapsoLanguageOntology.SFX_INSTANCE,
			"superClassName": this.prefix + "Instance"
		});		
		this.objectInstance = new OntClass({
			"className": this.prefix + 'Object' + EnapsoLanguageOntology.SFX_INSTANCE,
			"superClassName": this.prefix + "Instance"
		});		
		this.arrayInstance = new OntClass({
			"className": this.prefix + 'Array' + EnapsoLanguageOntology.SFX_INSTANCE,
			"superClassName": this.prefix + "Instance"
		});		
		this.regExpInstance = new OntClass({
			"className": this.prefix + 'RegExp' + EnapsoLanguageOntology.SFX_INSTANCE,
			"superClassName": this.prefix + "Instance"
		});		

		this.tripleStore.addTriples({ triples: this.stringInstance.getTriples() });
		this.tripleStore.addTriples({ triples: this.numberInstance.getTriples() });
		this.tripleStore.addTriples({ triples: this.booleanInstance.getTriples() });
		this.tripleStore.addTriples({ triples: this.dateInstance.getTriples() });
		this.tripleStore.addTriples({ triples: this.objectInstance.getTriples() });
		this.tripleStore.addTriples({ triples: this.arrayInstance.getTriples() });
		this.tripleStore.addTriples({ triples: this.regExpInstance.getTriples() });

		// Literals
		this.stringLiteral = new OntClass({
			"className": this.prefix + 'String' + EnapsoLanguageOntology.SFX_LITERAL,
			"superClassName": this.prefix + "Literal"
		});		
		this.numberLiteral = new OntClass({
			"className": this.prefix + 'Number' + EnapsoLanguageOntology.SFX_LITERAL,
			"superClassName": this.prefix + "Literal"
		});		
		this.booleanLiteral = new OntClass({
			"className": this.prefix + 'Boolean' + EnapsoLanguageOntology.SFX_LITERAL,
			"superClassName": this.prefix + "Literal"
		});		
		this.dateLiteral = new OntClass({
			"className": this.prefix + 'Date' + EnapsoLanguageOntology.SFX_LITERAL,
			"superClassName": this.prefix + "Literal"
		});		
		this.objectLiteral = new OntClass({
			"className": this.prefix + 'Object' + EnapsoLanguageOntology.SFX_LITERAL,
			"superClassName": this.prefix + "Literal"
		});		
		this.arrayLiteral = new OntClass({
			"className": this.prefix + 'Array' + EnapsoLanguageOntology.SFX_LITERAL,
			"superClassName": this.prefix + "Literal"
		});		
		this.regExpLiteral = new OntClass({
			"className": this.prefix + 'RegExp' + EnapsoLanguageOntology.SFX_LITERAL,
			"superClassName": this.prefix + "Literal"
		});		

		this.tripleStore.addTriples({ triples: this.stringLiteral.getTriples() });
		this.tripleStore.addTriples({ triples: this.numberLiteral.getTriples() });
		this.tripleStore.addTriples({ triples: this.booleanLiteral.getTriples() });
		this.tripleStore.addTriples({ triples: this.dateLiteral.getTriples() });
		this.tripleStore.addTriples({ triples: this.objectLiteral.getTriples() });
		this.tripleStore.addTriples({ triples: this.arrayLiteral.getTriples() });
		this.tripleStore.addTriples({ triples: this.regExpLiteral.getTriples() });
	}

	createOntologySkeleton() {
		this.tripleStore = new OntTripleStore({
			context: this.context
		});

		// ### Prefixes ###

		this.tripleStore.addTriple({
			triple: new OntTriple({
				"subject": "@prefix", "predicate": ":", "object": "<http://ont.enapso.com/nodejs#>"
			})
		});
		this.tripleStore.addTriple({
			triple: new OntTriple({
				"subject": "@prefix", "predicate": "ennjs:", "object": "<http://ont.enapso.com/nodejs#>"
			})
		});
		this.tripleStore.addTriple({
			triple: new OntTriple({
				"subject": "@base", "predicate": "", "object": "<http://ont.enapso.com/nodejs#>"
			})
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

		// Reserved Root Class
		this.reservedRoot = new OntClass({
			"className": this.prefix + 'Reserved'
		});
		this.tripleStore.addTriples({ triples: this.reservedRoot.getTriples() });
		this.tripleStore.addTriples({
			triples: new OntClass({
				"className": this.prefix + 'Null',
				"superClassName": this.reservedRoot.getClassName()
			}).getTriples()
		});
		this.tripleStore.addTriples({
			triples: new OntClass({
				"className": this.prefix + 'Void',
				"superClassName": this.reservedRoot.getClassName()
			}).getTriples()
		});
		this.tripleStore.addTriples({
			triples: new OntClass({
				"className": this.prefix + 'NaN',
				"superClassName": this.reservedRoot.getClassName()
			}).getTriples()
		});


		// Module Root Class
		this.moduleRoot = new OntClass({
			"className": this.prefix + 'Module'
		});
		// Class Root Class
		this.classRoot = new OntClass({
			"className": this.prefix + 'Class'
		});
		// Method Root Class
		this.methodRoot = new OntClass({
			"className": this.prefix + 'Method'
		});
		// Constructor Root Class
		this.constructorRoot = new OntClass({
			"className": this.prefix + 'Constructor'
		});
		// Properties Root Class
		this.propertyRoot = new OntClass({
			"className": this.prefix + 'Property'
		});
		// Arguments Root Class
		this.argumentRoot = new OntClass({
			"className": this.prefix + 'Argument'
		});
		// Result Root Class
		this.resultRoot = new OntClass({
			"className": this.prefix + 'Result'
		});
		// Instance Root Class
		this.instanceRoot = new OntClass({
			"className": this.prefix + 'Instance'
		});
		// Literal Root Class
		this.literalRoot = new OntClass({
			"className": this.prefix + 'Literal'
		});

		this.createEcmaScriptBasics();

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
		this.tripleStore.addTriples({ triples: this.moduleRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.classRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.methodRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.constructorRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.propertyRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.argumentRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.resultRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.instanceRoot.getTriples() });
		this.tripleStore.addTriples({ triples: this.literalRoot.getTriples() });
	}

}

module.exports = {
	EnapsoLanguageOntology
}

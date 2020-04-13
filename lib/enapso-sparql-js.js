// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

// require the Enapso GraphDB Client package
const
	{ EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client'),
	{ EnapsoLogger } = require('@innotrade/enapso-logger'),
	{ ensptools } = require('@innotrade/enapso-sparql-tools'),
	{ jsast, jsastgen } = require('@innotrade/enapso-jsast'),
	{ EnapsoORM, EnapsoGraphDBAdapter } = require('@innotrade/enapso-orm')
	;

const enjsast = jsast; enjsastgen = jsastgen;

// connection data to the running GraphDB instance
const
	GRAPHDB_BASE_URL = 'http://localhost:7200',
	GRAPHDB_REPOSITORY = 'enapso-dev',
	GRAPHDB_USERNAME = 'admin',
	GRAPHDB_PASSWORD = 'root',
	GRAPHDB_CTX_JSAST = 'http://ont.enapso.com/jsast'

// the default prefixes for all SPARQL queries
const EDO_PREFIXES = [
	EnapsoGraphDBClient.PREFIX_OWL,
	EnapsoGraphDBClient.PREFIX_RDF,
	EnapsoGraphDBClient.PREFIX_RDFS
];

const
	NS_EDO = 'http://ont.enapso.co/jsast#',

	adapterConfig = {
		"class": EnapsoGraphDBAdapter,
		"id": "graphdb",
		"dbUrl": "http://localhost:7200/",
		"dbAlias": "local",
		"schema": "enapso-dev",

		"prefixes": // the default prefixes for all SPARQL queries
			[
				EnapsoGraphDBClient.PREFIX_OWL,
				EnapsoGraphDBClient.PREFIX_RDF,
				EnapsoGraphDBClient.PREFIX_RDFS,
				EnapsoGraphDBClient.PREFIX_XSD,
				{
					"prefix": "enjsast",
					"iri": NS_EDO
				}
			],

		"defaultPrefix": "enjsast",
		"defaultNamespace": NS_EDO
	};


class EnapsoSPARQLJS {

	constructor() {
		this.orm = null;
	}

	async init() {
		// instantiate the ORM with the desired DB adapters
		this.orm = new EnapsoORM();

		// instantiate the MongoDB Adapter with the require connection configuration
		this.adapter = new EnapsoGraphDBAdapter(
			adapterConfig
		);

		// add the adapter to the ORM
		this.orm.addAdapter({
			"id": adapterConfig.id,
			"adapter": this.adapter
		});

		await this.adapter.connect();
		// await adapter.login("admin", "root");
		this.endpoint = this.adapter.graphDBEndpoint;

		console.log('done');
	}

	async loadClasses() {
		/*
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX owl: <http://www.w3.org/2002/07/owl#>
		PREFIX enjsast: <http://ont.enapso.com/jsast#>
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		*/
		let sparql = `
select distinct
	?class ?property ?restriction ?value ?type ?cardinality
	# ?propertyType ?range
	# *
where {
	# specify the JS AST graph
	graph <http://ont.enapso.com/jsast> {
		
		# get root node of class declaration
		# bind( enjsast:MethodDefinition as ?class ) .
		# bind( enjsast:FunctionDeclaration as ?class ) .
		# bind( enjsast:ArrayExpression as ?class ) .
		# bind( enjsast:Literal as ?class ) .
		# bind( (enjsast:ArrayExpression||enjsast:VariableDeclaration) as ?class ) .
		?class a owl:Class .
		# filter(?class in (enjsast:ArrayExpression, enjsast:MethodDefinition, enjsast:VariableDeclaration))
		# bind( dnp:Company as ?class ) .
		
		# here we want explicit classes only
		filter( !isBlank(?class) )
		
		# get all subClassOf specifications
		?class rdfs:subClassOf ?subClassOf .

		# ?subClassOf is simple property restriction?
		{    
			?subClassOf owl:onProperty ?property .
			{
				?subClassOf owl:hasValue ?value
				bind( "value" as ?restriction )
			}
			union
			{
				?subClassOf owl:someValuesFrom ?type
				bind( "some" as ?restriction )
			}
			union
			{
				?subClassOf owl:allValuesFrom ?onlyEval .
				{
					{
						?onlyEval owl:unionOf ?unionOf .
						?unionOf rdf:rest*/rdf:first ?unionOfItem .
						bind( ?unionOfItem as ?type ) .
						bind( "unionOfOnly" as ?restriction )
					}
					union
					{
						filter( !isBlank(?onlyEval) )
						bind( ?onlyEval as ?type ).
						bind( "only" as ?restriction )
					}
				}          	
			}
			union
			{
				?subClassOf ?cardinalityType ?cardinality .
				filter( ?cardinalityType in (owl:qualifiedCardinality, owl:minQualifiedCardinality, owl:maxQualifiedCardinality) ) 
				bind(
					if( ?cardinalityType = owl:minQualifiedCardinality, "Min",
					if( ?cardinalityType = owl:maxQualifiedCardinality, "Max",
					"Exactly"))
					as ?cardinalityStr
				)
				# todo: check if both can be applied (union) or if it is exclusive or (alternative)
				#{ 
				#    ?subClassOf owl:onClass ?type 
				#    bind( lcase(?cardinalityStr) as ?restriction ) # "exactly"
				#} 
				#union
				{ 
					?subClassOf (owl:onDataRange|owl:onClass) ?typeEval .
					{
						{
							?typeEval owl:unionOf ?unionOf .
							?unionOf rdf:rest*/rdf:first ?unionOfItem .
							bind( ?unionOfItem as ?type ).
							bind( concat("unionOf", ?cardinalityStr) as ?restriction )
						}
						union
						{
							filter( !isBlank(?typeEval) )
							bind( ?typeEval as ?type ).
							bind( lcase(?cardinalityStr) as ?restriction ) # "exactly"
						}
					}
				} 
				}
		}
		
		union
		
		# ?subClassOf is unionOf restriction?
		{    
			?subClassOf owl:unionOf ?unionOf .
			?unionOf rdf:rest*/rdf:first ?unionOfItem .
			?unionOfItem owl:onProperty ?property .
			{
				{
					?unionOfItem owl:hasValue ?value .
					bind( "unionOfValue" as ?restriction )
				} 
				union
				{
					?unionOfItem owl:someValuesFrom ?type
					bind( "unionOfSome" as ?restriction )
				}
				union
				{
					?unionOfItem owl:allValuesFrom ?type
					bind( "unionOfOnly" as ?restriction )
				}

			}
		}
		
		union
		
		# ?subClassOf a parent class?
		{ 
			filter(!isBlank(?subClassOf))
			bind(?subClassOf as ?type)
			bind("parent" as ?restriction) .
		}
		
	}
}
order by
	?class ?property ?restriction`;

		let res = await this.endpoint.query(sparql);
		res = this.endpoint.transformBindingsToResultSet(res, {
			dropPrefixes: false
		});
		// console.log(JSON.stringify(res));


		let me = this;

		let curCls = null;
		let curClsStr = null;
		let curProp = null;
		let curPropStr = null;

		let saveCurProp = function () {
			if (curCls === null || curProp === null) {
				return;
			};
			curCls.addProperty(curProp);
		}

		let saveCurClass = async function () {
			if (curCls === null) {
				return;
			};
			saveCurProp();

			let AST = await me.buildASTFromClass(curCls);

			curPropStr = null;
			curProp = null;
		};

		for (let record of res.records) {
			if (record.class !== curClsStr) {
				await saveCurClass();

				// split iri into namespace an class name
				let iriParts = record.class.split('#', 2);
				curCls = new ensptools.Class(iriParts[0], iriParts[1]);

				curClsStr = record.class;
			}

			if (record.restriction === "parent") {
				curCls.setParentIRI(record.type);
			}

			if (record.property && record.property != curPropStr) {
				saveCurProp();
				let iriParts = record.property.split('#', 2);
				curProp = new ensptools.Property(iriParts[0], iriParts[1]);
				curPropStr = record.property;
			}
		}
		await saveCurClass();

	}

	async buildASTFromClass(cls) {

		let getPropertyAssignment = function(property, param) {
			let left = new enjsast.MemberExpression(new enjsast.ThisExpression(), new enjsast.Identifier(property.getName()));
			let right = param || new enjsast.Literal(null);
			let assignmentExpression = new enjsast.AssignmentExpression(left, "=", right);
			return new enjsast.ExpressionStatement(assignmentExpression);
		};

		let getGetter = function (property) {

			let name = property.getName();
			name = "get" + name.substr(0, 1).toUpperCase() + name.substr(1);

			let thisMember = new enjsast.MemberExpression(new enjsast.ThisExpression(), new enjsast.Identifier(property.getName()));
			let returnStatement = new enjsast.ReturnStatement(thisMember);

			let getterBody = new enjsast.BlockStatement([returnStatement]);
			let getterKey = new enjsast.Identifier(name);
			let getterParams = [];
			let functionExpression = new enjsast.FunctionExpression(enjsast.SYNC, null, getterParams, getterBody);
			let getter = new enjsast.MethodDefinition(enjsast.DYNAMIC, enjsast.METHOD, getterKey, functionExpression);
			return getter;
		};

		let getSetter = function (property) {
			let param = new enjsast.Identifier(property.getName());
			let setterParams = [param];

			let assignmentExpression = getPropertyAssignment(property, param);

			let setterBody = new enjsast.BlockStatement([assignmentExpression]);
			let name = property.getName();
			name = "set" + name.substr(0, 1).toUpperCase() + name.substr(1);
			let setterKey = new enjsast.Identifier(name);

			let functionExpression = new enjsast.FunctionExpression(enjsast.SYNC, null, setterParams, setterBody);
			let setter = new enjsast.MethodDefinition(enjsast.DYNAMIC, enjsast.METHOD, setterKey, functionExpression);
			return setter;
		};

		// generate identifier for the class
		let id = new enjsast.Identifier(cls.getName());
		// and optionally for the super class
		let superClassId = cls.getParentName() ? new enjsast.Identifier(cls.getParentName()) : null;

		let constructorBody = new enjsast.BlockStatement([]);
		let constructorKey = new enjsast.Identifier("constructor");
		let constructorParams = [];
		let functionExpression = new enjsast.FunctionExpression(enjsast.SYNC, null, constructorParams, constructorBody);
		let constructor = new enjsast.MethodDefinition(enjsast.DYNAMIC, enjsast.CONSTRUCTOR, constructorKey, functionExpression);
		let classBody = new enjsast.ClassBody();
		classBody.appendMethod(constructor);

		for (let property of cls.getProperties()) {
			constructorBody.appendStatement(getPropertyAssignment(property));
			let getter = getGetter(property);
			classBody.appendMethod(getter);
			let setter = getSetter(property);
			classBody.appendMethod(setter);
		}

		let classDeclaration = new enjsast.ClassDeclaration(id, superClassId, classBody);

		// console.log(JSON.stringify(classDeclaration));

		let code = await enjsastgen.ast2Code(classDeclaration);
		console.log(code);

		return null;
	}

}

module.exports = {
	EnapsoSPARQLJS,
	enspjs: {
		EnapsoSPARQLJS
	}
};

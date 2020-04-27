
const fs = require('fs');
const enspjs = require('../index');


function demo() {
	let enlo = new enspjs.EnapsoLanguageOntology({
		"ontologyId": "ecmascript",
		"prefix": "enecma"
	});
	enlo.createOntologySkeleton();

	enlo.addClass({ "className": "Test" });
	enlo.addConstructor({});
	enlo.addMethod({ "methodName": "addItem" });
	enlo.addVariant({ "variantName": "1" });
	enlo.addMethod({ "methodName": "deleteItem" });
	enlo.addVariant({ "variantName": "1" });
	enlo.addMethod({ "methodName": "updateItem" });
	enlo.addVariant({ "variantName": "1" });
	enlo.addMethod({ "methodName": "getItem" });
	enlo.addVariant({ "variantName": "1" });
	enlo.addArgument({
		"name": "hello",
		"type": enlo.prefix + "StringInstance"
	});
	enlo.addArgument({
		"name": "world",
		"type": enlo.prefix + "NumberInstance"
	});

	fs.writeFileSync('./out/triples.ttl', enlo.tripleStore.getTurtle());
}

demo();

# enapso-sparql-js
Enapso SPARQL Abstraction for Node.js

Enapso SPARQL JS provides a set of JavaScript classes for node.js on top of the Enapso SPAQL Toolbox. While the toolbox is a pure and platform independent SPARQL code generator, this package provides an easy-to-use JavaScript abstraction layer to easily read classes and their imstances from SPARQL compliant RDF stores, OWL ontologies and knowledge graphs.

**The following demos require a running GraphDB 8.x instance on localhost at port 7200. The demos as well as the automated tests require a fully working Ontotext GraphDB repository "Test" and a user "Test" with the password "Test" being set up, which has read/write access to the "Test" Repository.**
Get the latest version of GraphDB for free at https://www.ontotext.com/free-graphdb-download-copy/.

**This project is actively developed and maintained.**
To discuss questions and suggestions with the Enapso and GraphDB community, we'll be happy to meet you in our forum at https://www.innotrade.com/forum/.

# Installation 
```
npm i enapso-sparql-js --save
```

# Get Class Schema
```javascript
var lRes = await EnapsoSPARQLJS.getClassSchema({
    classIRI: "http://ont.enapso.com/test#Person",
    context: "http://ont.enapso.com/test"
});
console.log("\nClass Schema: " + JSON.stringify(lRes, null, 2));
```
### Result
```json
{
  "total": 2,
  "success": true,
  "records": [
    {
      "node": "http://ont.enapso.com/test#Person",
      "edge": "http://ont.enapso.com/test#firstName",
      "filler": "http://www.w3.org/2001/XMLSchema#string",
      "exactly": "1"
    },
    {
      "node": "http://ont.enapso.com/test#Person",
      "edge": "http://ont.enapso.com/test#lastName",
      "filler": "http://www.w3.org/2001/XMLSchema#string",
      "exactly": "1"
    }
  ]
}
```
# Get Individuals
```javascript
var lRes = await EnapsoSPARQLJS.getIndividuals({
    classIRI: "http://ont.enapso.com/test#Person",
    context: "http://ont.enapso.com/test"
});
console.log("\nIndividuals: " + JSON.stringify(lRes, null, 2));
```
### Result
```json
{
  "total": 2,
  "success": true,
  "records": [
    {
      "IRI": "http://ont.enapso.com/test#Person_AlexanderSchulze",
      "firstName": "Alexander",
      "lastName": "Schulze"
    },
    {
      "IRI": "http://ont.enapso.com/test#Person_OsvaldoAguilarLauzurique",
      "firstName": "Osvaldo",
      "lastName": "Aguilar Lauzurique"
    }
  ]
}
```

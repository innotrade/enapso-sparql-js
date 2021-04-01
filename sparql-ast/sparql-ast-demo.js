// ENAPSO SPARQL JS
// (C) Copyright 2021 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

// Parse a SPARQL query to a JSON object
var SparqlParser = require("sparqljs").Parser;

var parser = new SparqlParser();
var parsedQuery = parser.parse(`
  PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
  SELECT ?p ?c WHERE {
  {     ?a ?b _:hola .
         _:hola ?y ?z .
    } 
    union
    {
    ?p a dbpedia-owl:Artist.
             ?p dbpedia-owl:birthPlace ?c.
      ?c <http://xmlns.com/foaf/0.1/name> "York"@en.
  }
}`);
console.log("SPARQL AST:\n" + JSON.stringify(parsedQuery, null, 2));

// Regenerate a SPARQL query from a JSON object
var SparqlGenerator = require("sparqljs").Generator;
var generator = new SparqlGenerator({
  // prefixes,
  // baseIRI: "http://base.com",
  // factory,
  // sparqlStar: false,
});
var generatedQuery = generator.stringify(parsedQuery);

console.log("Beautified SPARQL:\n" + generatedQuery);

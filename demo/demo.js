// Innotrade Enapso SPARQL JS
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

// require the Enapso GraphDB Client
const EnapsoGraphDBClient = require("@innotrade/enapso-graphdb-client");

// require the Enapso SPARQL JS
const { enspjs } = require("../index");


console.log("Enapso SPARQL JS Demo\n(C) Copyright 2020 Innotrade GmbH Herzogenrath, NRW, Germany");

class EnapsoSPARQLJSDemo {

	async demo() {
		let spjs = new enspjs.EnapsoSPARQLJS();
		await spjs.init();
		await spjs.loadClasses();
	}

}

new EnapsoSPARQLJSDemo().demo();
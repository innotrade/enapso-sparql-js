// Innotrade Enapso SPARQL JS
// (C) Copyright 2019 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze

const chai = require('chai');
const should = require('chai').should;
const expect = require('chai').expect;
const EnapsoGraphDBAdmin = require("../enapso-graphdb-admin");
const testConfig = require("./config");


describe("Enapso GraphDB SPARQL JS Tests", () => {

	// before(function (done) { setTimeout(function () { done(); }, 500); });

	it('Get all repositories of local GraphDB instance', (done) => {
		EnapsoGraphDBAdmin.getRepositories({
		}).then(result => {
			// console.log(result);
			expect(result).to.exist;
			done();
		})
	});


});

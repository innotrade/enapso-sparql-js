
class OntTripleStore {

    constructor() {
        this.store = [];
    }

    add(triple) {
        this.store.push(triple);
    }

    getTurtle() {
        
    }
}

module.exports = {
    OntTripleStore
}
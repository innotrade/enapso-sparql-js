


class OntTriple {

    constructor(subject, predicate, object, context) {
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
        this.context = context;
    }

    getTurtle() {
        return this.subject + ' ' + this.predicate + ' ' + this.object;
    }
}

module.exports = {
    OntTriple
}
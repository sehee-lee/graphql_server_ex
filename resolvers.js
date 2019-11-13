var people = require('./people.json');

module.exports = {
    Query: {
        findPerson: (parent, { id }) => {
            const person = people[id-1];
            if (person) {
                return person;
            } else {
                throw new Error('Not Found!');
            }
        },
        allPeople: (parent) => {
            return people;
        }
    },

    Mutation: {
        deletePerson: (parent, { id }) => {
            const index = people.findIndex(person => person.id === id);
            if (index < 0) return false;
            people.splice(index, 1);
            return true;
        }
    }
};

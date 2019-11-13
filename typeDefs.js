const { gql } = require('apollo-server');

module.exports = gql`
    type Person {
        id: Int!
        first_name: String!
        last_name: String!
        email: String
        gender: String
        ip_address: String
    }

    type Query {
        findPerson(id: Int!): Person
        allPeople: [Person]
    }
    type Mutation {
        deletePerson(id: Int!): Boolean
    }
`;

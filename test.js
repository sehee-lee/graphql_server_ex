const { ApolloServer, gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { query, mutate } = createTestClient(server);

test('find person', async () => {
  const FIND_PERSON = gql`
    query {
      findPerson(id: 1) {
        id
        first_name
      }
    }
  `;

  const {
    data: { findPerson }
  } = await query({ query: FIND_PERSON });

  expect(findPerson).toEqual({ id: 1, first_name: 'Jeanette' });
});

test('throw error if user is not found', async () => {
  const FIND_PERSON = gql`
    query {
      findPerson(id: 10) {
        id
        first_name
      }
    }
  `;

  const {
    errors: [error]
  } = await await query({ query: FIND_PERSON });

  expect(error.message).toEqual('Not Found!');
});

test('delete person', async () => {
  const DELETE_PERSON = gql`
    mutation($id: Int!) {
      deletePerson(id: $id)
    }
  `;

  const {
    data: { deletePerson }
  } = await mutate({ mutation: DELETE_PERSON, variables: { id: 1 } });

  expect(deletePerson).toBeTruthy();
});

test('can not delete user twice', async () => {
  const DELETE_PERSON = gql`
    mutation($id: Int!) {
      deletePerson(id: $id)
    }
  `;

  const {
    data: { deletePerson }
  } = await mutate({ mutation: DELETE_PERSON, variables: { id: 1 } });

  expect(deletePerson).toBeFalsy();
});

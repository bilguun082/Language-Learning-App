import { gql } from '@apollo/client';

export const GET_USER = gql`
  query Query($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      email
      username
    }
  }
`;

export const GET_USERS = gql`
  query Query {
    getUsers {
      id
      email
      username
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Mutation($input: UserRegisterInput!) {
    registerUser(input: $input) {
      id
      email
      username
    }
  }
`;

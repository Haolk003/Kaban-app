import { gql, DocumentNode } from "@apollo/client";

export const LOGIN: DocumentNode = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      access_token
    }
  }
`;

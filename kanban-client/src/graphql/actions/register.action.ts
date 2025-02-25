import { gql, DocumentNode } from "@apollo/client";

export const REGISTER: DocumentNode = gql`
  mutation RegisterUser($email: String!, $password: String!, $firstName: String!,$lastName: String!) {
    registerUser(
      registerDto: { email: $email, password: $password, firstName: $firstName, lastName: $lastName }
    )
  }
`;

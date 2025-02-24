import { gql, DocumentNode } from "@apollo/client";

export const REGISTER: DocumentNode = gql`
  mutation RegisterUser($email: String!, $password: String!, $name: String!) {
    registerUser(
      registerDto: { email: $email, password: $password, name: $name }
    )
  }
`;

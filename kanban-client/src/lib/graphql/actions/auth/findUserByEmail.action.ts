import { gql, DocumentNode } from "@apollo/client";

export const FIND_USER_BY_EMAIL: DocumentNode = gql`
  mutation FindUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      id
      name
      email
    }
  }
`;

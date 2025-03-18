import { gql, DocumentNode } from "@apollo/client";

export const CHECK_AUTH_QUERY: DocumentNode = gql`
  query CheckAuth {
    me {
      id
      email
      name
    }
  }
`;

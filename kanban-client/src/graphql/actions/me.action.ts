import { gql, DocumentNode } from "@apollo/client";

export const ME: DocumentNode = gql`
  query Me {
    me {
      id
    }
  }
`;

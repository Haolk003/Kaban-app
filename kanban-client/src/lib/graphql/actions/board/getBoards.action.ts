import { gql, DocumentNode } from "@apollo/client";

export const GET_BOARDS: DocumentNode = gql`
  query getBoardsByUserId {
    getBoardsByUserId {
      id
      title
      description
      projectKey
    }
  }
`;

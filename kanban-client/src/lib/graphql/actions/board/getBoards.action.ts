import { gql, DocumentNode } from "@apollo/client";

export const GET_BOARDS: DocumentNode = gql`
  query getBoardsByUserId {
    getBoardsByUserId {
      id
      title
      projectKey
      color
      createdAt
      updatedAt
      tasksCount {
        total
        completed
      }
      membersCount
      status
      isOwner
    }
  }
`;

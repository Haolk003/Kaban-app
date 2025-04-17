import { gql, DocumentNode } from "@apollo/client";

export const NEW_BOARD: DocumentNode = gql`
  mutation newBoard($title: String!, $description: String!) {
    newBoard(createBoardInput: { title: $title, description: $description }) {
      id
      title
      description
    }
  }
`;

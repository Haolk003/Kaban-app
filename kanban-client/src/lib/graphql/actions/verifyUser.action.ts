import { gql, DocumentNode } from "@apollo/client";

export const VERIFY_USER: DocumentNode = gql`
  mutation VerifyUser($token: String!, $activationCode: String!) {
    activateUser(
      activateUserInput: { token: $token, activationCode: $activationCode }
    ) {
      id
      email
      name
    }
  }
`;

import { gql, DocumentNode } from "@apollo/client";

export const RESET_PASSWORD: DocumentNode = gql`
  mutation ResetPassword($email: String!, $password: String!, $token: String!) {
    resetPassword(
      resetPasswordInput: {
        email: $email
        newPassword: $password
        token: $token
      }
    )
  }
`;

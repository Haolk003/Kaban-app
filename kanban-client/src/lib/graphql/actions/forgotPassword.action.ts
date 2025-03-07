import { gql, DocumentNode } from "@apollo/client";

export const FORGOT_PASSWORD: DocumentNode = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(forgotPasswordInput: { email: $email }) {
      password_reset_token_hash
      password_reset_expires_at
    }
  }
`;

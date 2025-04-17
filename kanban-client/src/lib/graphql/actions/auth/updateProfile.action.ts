import { gql, DocumentNode } from "@apollo/client";

export const UPDATE_PROFILE: DocumentNode = gql`
  mutation UpdateProfile(
    $name: String!
    $avatar: AvatarInput
    $jobName: String
    $bio: String
    $location: String
  ) {
    updateProfile(
      updateProfileDto: {
        name: $name
        avatar: $avatar
        jobName: $jobName
        bio: $bio
        location: $location
      }
    ) {
      name
      avatar {
        url
        public_id
      }
      jobName
      bio
      location
    }
  }
`;

import { gql } from "@apollo/client";


export const GET_BOARD_DETAIL_WITH_TASK = gql`
  query getBoardDetailWithTask($id: String!) {
    getBoardDetailById(id: $id) {
      id
      title
      description
      projectKey
      labels{
        name
        id
      }
      lists{
        id
        name
        tasks{
          taskId
          counts{
            subTask
            likes
            discussion
          }
          id
          title
          description
          createdAt
          labels{
            id
            name
          }
          dueDate
          assignedTo{
            user{
              id
              name
              avatar{
                url
                publicId
              }

            }
          }

        }
      }
      member{
        user{
          id
          name
          avatar{
            url
          }
        }
      }
    }
  }
`;

import {gql} from '@apollo/client';

export const ADD_MEMBER_TO_BOARD=gql`
mutation AddMemberToBoard($boardId:String!, $userId:String!, $role:String!){
    addMemberToBoard(addMemberBoardDto:{boardId:$boardId,userId:$userId,role:$role}){
        id
    }
}
`


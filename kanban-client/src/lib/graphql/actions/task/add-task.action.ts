import {gql,DocumentNode} from '@apollo/client';

export const ADD_TASK:DocumentNode = gql`
 
mutation createTask($listId:String!,$title:String!,$description:String!,$assignedTo:[String!],$dueDate:String,$labelIds:[String!],$priority:String!,$attachment:[AttachmentInput!]){
    createTask(input:{title:$title,listId:$listId,description:$description,assignedTo:$assignedTo,dueDate:$dueDate,labelIds:$labelIds,priority:$priority,attachmentsInput:$attachment}){
        id
        title
    }
}
`;
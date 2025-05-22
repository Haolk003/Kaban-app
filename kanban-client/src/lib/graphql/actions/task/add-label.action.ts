import {gql} from '@apollo/client';

export const ADD_LABEL=gql`
mutation AddLabel($boardId:String!, $name:String!){
    createLabel(createLabelDto:{boardId:$boardId,name:$name}){
        id
        name
    }
}
`
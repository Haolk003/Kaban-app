import {gql,DocumentNode} from '@apollo/client';

//TODO:test
export const CREATE_LIST:DocumentNode = gql`
mutation createList($name:String!){
    createList(name:$name){
        id
        name
    }
}
`;
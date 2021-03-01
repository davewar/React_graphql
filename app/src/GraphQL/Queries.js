
import { gql } from "@apollo/client";

// http://localhost:5000/graphql?

//list of authors
export const GET_AUTHORS_QUERY = gql`
query {
  
    authors{
      name
      id
      
    }
  
}
`
//list of books
export const GET_BOOKS_QUERY = gql`
query {
    books{
      name
      id
     
  }
  
}
`
//get a book
export const GET_BOOK_QUERY = gql`
query book($id: ID!) {
    book(id: $id){
      name
      id
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  
}
`


import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
      password
    }
  }
}
`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`

export const SAVE_BOOK = gql`
  mutation saveBook($bookToSave: BookInput) {
    saveBook(bookToSave: $bookToSave) {
      username
      email
      password
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String) {
  deleteBook(bookId: $bookId) {
    username
    email
    password
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`
import { gql } from '@apollo/client';

export const GET_LESSON_TEST = gql`
  query GetLessonTest($title: String!) {
    getLessonTest(title: $title) {
      id
      title
      selectionTests {
        id
        type
        sentence
        words
        correctForm
        isLast
      }
      grade
    }
  }
`;

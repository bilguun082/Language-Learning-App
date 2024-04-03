import { gql } from '@apollo/client';

export const GET_LESSON_TEST = gql`
  query Query($getLessonTestId: String!) {
    getLessonTest(id: $getLessonTestId) {
      id
      selectionTests {
        id
        type
        sentence
        words
        correctForm
      }
      grade
    }
  }
`;

export const CREATE_LESSON_TEST = gql`
  mutation Mutation($input: LessonTestInput!) {
    createLessonTest(input: $input) {
      id
      selectionTests {
        id
        type
        sentence
        words
        correctForm
      }
      grade
    }
  }
`;

export const UPDATE_LESSON_TEST = gql`
  mutation Mutation($updateLessonTestId: String!, $input: GradeInput!) {
    updateLessonTest(id: $updateLessonTestId, input: $input) {
      id
      selectionTests {
        id
        type
        sentence
        words
        correctForm
      }
      grade
    }
  }
`;

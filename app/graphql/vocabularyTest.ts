import { gql } from '@apollo/client';

export const GET_VOCABULARY_TEST = gql`
  query Query($getVocabularyTestId: String!) {
    getVocabularyTest(id: $getVocabularyTestId) {
      id
      vocabularySelectionTests {
        id
        words
        correctAnswer
      }
      grade
    }
  }
`;

export const CREATE_VOCABULARY_TEST = gql`
  mutation Mutation($input: VocabularyTestInput!) {
    createVocabularyTest(input: $input) {
      id
      vocabularySelectionTests {
        id
        words
        correctAnswer
      }
      grade
    }
  }
`;

export const UPDATE_VOCABULARY_TEST = gql`
  mutation Mutation($updateVocabularyTestId: String!, $input: GradeInput!) {
    updateVocabularyTest(id: $updateVocabularyTestId, input: $input) {
      id
      vocabularySelectionTests {
        id
        words
        correctAnswer
      }
      grade
    }
  }
`;

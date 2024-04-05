import { gql } from '@apollo/client';

export const GET_VOCABULARY_TEST = gql`
  query Query($getVocabularyTestId: String!) {
    getVocabularyTest(id: $getVocabularyTestId) {
      id
      vocabularySelectionTests {
        id
        question
        words
        correctAnswer
      }
      grade
    }
  }
`;

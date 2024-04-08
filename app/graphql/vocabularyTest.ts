import { gql } from '@apollo/client';

export const GET_VOCABULARY_TEST = gql`
  query GetVocabularyTest($title: String!) {
    getVocabularyTest(title: $title) {
      id
      title
      vocabularySelectionTests {
        id
        question
        words
        correctAnswer
        isLast
      }
      grade
    }
  }
`;

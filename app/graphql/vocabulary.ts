import { gql } from '@apollo/client';

export const GET_ALL_VOCABULARIES = gql`
  query Query {
    getAllVocabularies {
      id
      title
    }
  }
`;

export const GET_VOCABULARY = gql`
  query Query($getVocabularyId: String!) {
    getVocabulary(id: $getVocabularyId) {
      id
      title
      isStarted
      isDone
      words {
        id
        title
        image
        word
        translation
        exampleSentence
        isSaved
        isLast
      }
    }
  }
`;

export const UPDATE_VOCABULARY = gql`
  mutation UpdateVocabulary($updateVocabularyId: String!, $input: VocabularyUpdateInput!) {
    updateVocabulary(id: $updateVocabularyId, input: $input) {
      id
      isDone
      isStarted
      title
    }
  }
`;

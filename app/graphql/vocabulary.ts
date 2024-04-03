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
      words {
        id
        image
        word
        translation
        exampleSentence
        isSaved
      }
    }
  }
`;

export const CREATE_VOCABULARY = gql`
  mutation Mutation($input: VocabularyInput!) {
    createVocabulary(input: $input) {
      id
      title
      words {
        id
        image
        word
        translation
        exampleSentence
        isSaved
      }
    }
  }
`;

export const UPDATE_VOCABULARY = gql`
  mutation Mutation($updateVocabularyId: String!, $input: VocabularyUpdateInput!) {
    updateVocabulary(id: $updateVocabularyId, input: $input) {
      id
      title
      words {
        id
        image
        word
        translation
        exampleSentence
        isSaved
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_ALL_LESSONS = gql`
  query GetAllLessons {
    getAllLessons {
      id
      title
      isSaved
      facts {
        id
        image
        fact
        exampleSentence
      }
    }
  }
`;

export const GET_LESSON = gql`
  query GetAllLessons($getLessonId: String!) {
    getLesson(id: $getLessonId) {
      id
      title
      isSaved
      facts {
        id
        image
        fact
        exampleSentence
      }
    }
  }
`;

export const CREATE_LESSON = gql`
  mutation Mutation($input: LessonInput!) {
    createLesson(input: $input) {
      id
      title
      isSaved
      facts {
        id
        image
        fact
        exampleSentence
      }
    }
  }
`;

export const UPDATE_LESSON = gql`
  mutation Mutation($updateLessonId: String!, $input: UpdateInput!) {
    updateLesson(id: $updateLessonId, input: $input) {
      id
      title
      isSaved
      facts {
        id
        image
        fact
        exampleSentence
      }
    }
  }
`;

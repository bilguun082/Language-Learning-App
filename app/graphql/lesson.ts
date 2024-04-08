import { gql } from '@apollo/client';

export const GET_ALL_LESSONS = gql`
  query GetAllLessons {
    getAllLessons {
      id
      title
      isSaved
      isStarted
      isDone
    }
  }
`;

export const GET_LESSON = gql`
  query GetAllLessons($getLessonId: String!) {
    getLesson(id: $getLessonId) {
      id
      title
      isSaved
      isStarted
      isDone
      facts {
        id
        title
        image
        fact
        exampleSentence
        isLast
      }
    }
  }
`;

export const UPDATE_LESSON = gql`
  mutation Mutation($updateLessonId: String!, $input: UpdateInput!) {
    updateLesson(id: $updateLessonId, input: $input) {
      isDone
      isSaved
      isStarted
    }
  }
`;

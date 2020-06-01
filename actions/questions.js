export const RECEIVE_QUESTIONS = "receive_questions";

export const receiveQuestions = (questionsObject) => ({
  type: RECEIVE_QUESTIONS,
  questions: questionsObject,
});

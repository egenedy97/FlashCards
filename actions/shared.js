import { saveQuestion, getAllData } from "../utils/API";
import { receiveDecks } from "./decks";
import { receiveQuestions } from "./questions";
export const ADD_QUESTION = "add_question";

export const handleAddQuestion = ({ title, answer }, deckID) => {
  return (dispatch) => {
    saveQuestion({ title, answer }, deckID).then((question) =>
      dispatch(addQuestion(question))
    );
  };
};


export const addQuestion = (question) => ({
  type: ADD_QUESTION,
  question,
});


export const handleInitialData = () => {
  return (dispatch) => {
    getAllData().then(({ questions, decks }) => {
      dispatch(receiveDecks(decks));
      dispatch(receiveQuestions(questions));
    });
  };
};
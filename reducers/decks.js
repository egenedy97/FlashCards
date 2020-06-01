import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK } from "../actions/decks";
import { ADD_QUESTION } from "../actions/shared";
export default function (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks;
    case ADD_DECK:
      return { ...state, [action.deck.id]: { ...action.deck } };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.deckID]: {
          ...state[action.question.deckID],
          questions: state[action.question.deckID].questions.concat([
            action.question.id,
          ]),
        },
      };
    case DELETE_DECK:
      let updated_deleted = { ...state };
      delete updated_deleted[action.id];
      return updated_deleted;
    default:
      return state;
  }
}

import { RECEIVE_QUESTIONS } from "../actions/questions";
import { DELETE_DECK } from "../actions/decks";
import { ADD_QUESTION } from "../actions/shared";

export default function (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return action.questions;
    case ADD_QUESTION:
      return { ...state, [action.question.id]: action.question };
    case DELETE_DECK:
      let updated_deleted = { ...state };
      const _D_Deck_q_ids = Object.keys(updated_deleted);
      for (let q_id of _D_Deck_q_ids) {
        if (updated_deleted[q_id].deckID === action.id)
          delete updated_deleted[q_id];
      }
      return updated_deleted;
    default:
      return state;
  }
}

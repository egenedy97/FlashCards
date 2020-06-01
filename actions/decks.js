import { saveDeck, deleteDeck } from "../utils/API";

export const RECEIVE_DECKS = "receive_decks";
export const ADD_DECK = "add_deck";
export const DELETE_DECK = "delete_deck";

export const addDeck = (deck) => ({ type: ADD_DECK, deck });

export const receiveDecks = (decksObject) => ({
  type: RECEIVE_DECKS,
  decks: decksObject,
});

export const deleteReduxDeck = (id) => ({
  type: DELETE_DECK,
  id,
});


export const handleDeleteDeck = (id) => {
  return async (dispatch) => {
    deleteDeck(id); 
    dispatch(deleteReduxDeck(id));
  };
};


export const handleAddDeck = (title) => {
  return async (dispatch) => {
    let deck = await saveDeck(title);
    const action = addDeck(deck);
    dispatch(action); 
    return action;
  };
};
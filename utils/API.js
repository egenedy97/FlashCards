import { AsyncStorage } from "react-native";
import { v1 as uuid } from "react-native-uuid";
export const saveQuestion = async ({ title, answer }, deckID) => {
  let previousQuestions = {};
  let questions = await AsyncStorage.getItem("@questions");
  if (questions !== null) previousQuestions = JSON.parse(questions);
  const new_id = uuid();
  const new_question = { id: new_id, deckID, title, answer }; // ### format of questions
  AsyncStorage.setItem(
    "@questions",
    JSON.stringify({
      ...previousQuestions,
      [new_id]: new_question,
    })
  );
  let decks = await AsyncStorage.getItem("@decks");
  decks = JSON.parse(decks);
  decks = {
    ...decks,
    [deckID]: {
      ...decks[deckID],
      questions: decks[deckID].questions.concat([new_id]),
    },
  };
  AsyncStorage.setItem("@decks", JSON.stringify(decks));
  return new_question;
};
export const saveDeck = async (title) => {
  const new_id = uuid();
  const new_deck = { id: new_id, title, questions: [] }; // ### format of decks
  let decks = await AsyncStorage.getItem("@decks");
  decks = decks !== null ? JSON.parse(decks) : {};
  AsyncStorage.setItem(
    "@decks",
    JSON.stringify({
      ...decks,
      [new_id]: new_deck,
    })
  );
  return new_deck;
};
export const getAllData = async () => {
  let [decks, questions] = await Promise.all([
    AsyncStorage.getItem("@decks"),
    AsyncStorage.getItem("@questions"),
  ]);
  decks = decks !== null ? JSON.parse(decks) : {};
  questions = questions !== null ? JSON.parse(questions) : {};
  return { decks, questions };
};
export const deleteDeck = async (deckID) => {
  let { decks, questions } = await getAllData();
  delete decks[deckID];
  let q_ids = Object.keys(questions);
  for (let q_id of q_ids) {
    if (questions[q_id].deckID === deckID) delete questions[q_id];
  }
  AsyncStorage.setItem("@decks", JSON.stringify(decks));
  AsyncStorage.setItem("@questions", JSON.stringify(questions));
};

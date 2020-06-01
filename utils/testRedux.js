import { handleInitialData, handleAddQuestion } from "../Actions/shared";
import { handleAddDeck } from "../Actions/decks";
import { AsyncStorage } from "react-native";
const testRedux = async () => {
  //   await AsyncStorage.removeItem("@decks");
  //   await AsyncStorage.removeItem("@questions");
  //--------------------------------------------------------
  let t = await props.dispatch(handleInitialData());
  t = await props.dispatch(handleAddDeck("deck0"));
  t = await props.dispatch(
    handleAddQuestion(
      { title: "q0", answer: "ans0" },
      "49822ee0-9567-11ea-b583-bdfccf6280a1"
    )
  );
};
export default testRedux;

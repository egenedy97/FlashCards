import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { handleDeleteDeck } from "../../actions/decks";
import { CommonActions } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function DeckScreen(props) {
  console.log("Deck screen props", props);
  const { deckId } = props.route.params;
  props.navigation.setOptions({ title: props.deckTitle });
  const onDeleteDeck = () => {
    props.dispatch(handleDeleteDeck(deckId));
    props.navigation.dispatch(CommonActions.goBack());
  };
  const onAddCardPress = () => {
    props.navigation.push("AddCard", { deckId });
  };
  const onStartQuiz = () => {
    props.navigation.push("Quiz", { deckId });
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, marginBottom: 30 }}>
        {props.cardsCount} Cards
      </Text>
      <TouchableOpacity
        style={[styles.btn, styles.row]}
        onPress={onAddCardPress}
      >
        <MaterialCommunityIcons name="library-plus" color="white" size={15} />
        <Text style={{ color: "white" }}> Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.row]} onPress={onStartQuiz}>
        <MaterialCommunityIcons
          name="comment-question"
          color="white"
          size={15}
        />
        <Text style={{ color: "white" }}> Start Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.delete, styles.row]}
        onPress={onDeleteDeck}
      >
        <MaterialCommunityIcons name="delete" color="white" size={15} />
        <Text style={{ color: "white" }}> Delete Deck</Text>
      </TouchableOpacity>
    </View>
  );
}
export default connect(({ decks }, props) => {
  return decks[props.route.params.deckId]
    ? {
        deckTitle: decks[props.route.params.deckId].title,
        cardsCount: decks[props.route.params.deckId].questions.length,
      }
    : {};
})(DeckScreen);

const styles = StyleSheet.create({
  delete: {
    marginTop: 40,
    backgroundColor: "#ff00b2",
  },
  btn: {
    borderWidth: 1,
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 5,
    borderColor: "#ccc",
    height: 38,
    justifyContent: "center",
    backgroundColor: "#00b2ff",
    margin: 5,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
  },
});

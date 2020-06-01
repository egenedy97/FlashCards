import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CommonActions } from "@react-navigation/native";

export default function QuizResult(props) {
  const { deckId, deckTitle, points, totalPoints } = props.route.params;
  const backToDeck = () => {
    props.navigation.dispatch(CommonActions.navigate("DeckScreen", { deckId })); // navigate checks history first and will not push
  };
  const quizAgain = () => {
    props.navigation.dispatch(CommonActions.navigate("Quiz", { deckId }));
  };
  return (
    <View style={[styles.container]}>
      <Text style={{ fontSize: 18, marginBottom: 49 }}>
        Score {points}/{totalPoints}
      </Text>
      <TouchableOpacity onPress={quizAgain} style={styles.btn}>
        <Text style={{ color: "white" }}>Quiz Again</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={backToDeck} style={styles.btn}>
        <Text style={{ color: "white" }}>Back to {deckTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 40,
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
});

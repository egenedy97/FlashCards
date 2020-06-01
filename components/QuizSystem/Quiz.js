import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { clearNotificationsAndSetOneForTomorrow } from "../../utils/Notifications";

function Quiz(props) {
  useEffect(() => {
    if (Platform.OS !== "web") {
      clearNotificationsAndSetOneForTomorrow();
    }
  }, []);
  const { deckId } = props.route.params;
  const { questions, deckTitle } = props; // question -> {id,title,answer}
  props.navigation.setOptions({ title: `${deckTitle} Quiz` });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const reset = () => {
    setQuestionIndex(0);
    setPoints(0);
    setShowAnswer(false);
  };
  const onSubmitAnswer = (isCorrect) => {
    setShowAnswer(false);
    let score = points;
    if (isCorrect) {
      score = points + 1;
      setPoints(score);
    }
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      // reset and navigate to Quiz Result send deckId & deckTitle & points & totalPoints
      reset();
      props.navigation.push("QuizResult", {
        deckId,
        points: score,
        deckTitle,
        totalPoints: questions.length,
      });
    }
  };
  const title = questions[questionIndex] ? questions[questionIndex].title : "";
  const answer = questions[questionIndex]
    ? questions[questionIndex].answer
    : "";

  return (
    <View style={[styles.container]}>
      {questions.length === 0 && (
        <View>
          <Text style={styles.warning}>No Cards Added to this deck</Text>
        </View>
      )}
      {questions.length > 0 && (
        <View style={styles.quiz}>
          <Text style={styles.cardOrder}>
            Card {questionIndex + 1} of {questions.length}
          </Text>
          <Text style={styles.body}>{showAnswer ? answer : title}</Text>
          <TouchableOpacity
            onPress={() => setShowAnswer((showAnswer) => !showAnswer)}
          >
            <Text style={styles.warning}>
              {showAnswer ? "Question" : "Answer"}
            </Text>
          </TouchableOpacity>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => onSubmitAnswer(true)}
              style={styles.btn}
            >
              <Text style={{ color: "white" }}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onSubmitAnswer(false)}
              style={[styles.btn, { backgroundColor: "#ff00b2" }]}
            >
              <Text style={{ color: "white" }}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  quiz: {
    borderWidth: 1,
    borderRadius: 7,
    width: Dimensions.get("window").width * 0.85,
    padding: 15,
    borderColor: "#ccc",
    alignItems: "center",
  },
  warning: {
    color: "red",
    fontSize: 16,
  },
  cardOrder: {
    fontSize: 14,
    alignSelf: "flex-start",
  },
  body: {
    fontSize: 18,
    marginTop: 10,
  },
  actions: {
    marginTop: 40,
  },
  btn: {
    borderWidth: 1,
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 5,
    borderColor: "#ccc",
    height: 38,
    justifyContent: "center",
    backgroundColor: "#00aa91",
    margin: 5,
    alignItems: "center",
  },
});
const mapStateToProps = ({ questions, decks }, props) => {
  const deckId = props.route.params.deckId;
  let qs = decks[deckId].questions;
  return {
    questions: qs.map((id) => questions[id]),
    deckTitle: decks[deckId].title,
  };
};
export default connect(mapStateToProps)(Quiz);

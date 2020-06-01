import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../actions/shared";
import { CommonActions } from "@react-navigation/native";
import { color } from "react-native-reanimated";
function AddCard(props) {
  props.navigation.setOptions({ title: "Add Card" });
  const { deckId } = props.route.params;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const onCreateCard = () => {
    if (question && answer) {
      props.dispatch(handleAddQuestion({ title: question, answer }, deckId));
      props.navigation.dispatch(CommonActions.goBack());
    }
  };
  return (
    <View style={[viewStyles.container]}>
      <TextInput
        placeholder="Question"
        onChangeText={(text) => setQuestion(text)}
        style={viewStyles.textInput}
      />
      <TextInput
        placeholder="Answer"
        onChangeText={(text) => setAnswer(text)}
        style={viewStyles.textInput}
      />
      <TouchableOpacity onPress={onCreateCard} style={viewStyles.btn}>
        <Text style={{ color: "white" }}>Create Card</Text>
      </TouchableOpacity>
    </View>
  );
}
const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 45,
  },
  textInput: {
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 5,
    height: 30,
    paddingTop: 4,
    paddingBottom: 4,
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
    marginTop: 20,
  },
});
export default connect()(AddCard);

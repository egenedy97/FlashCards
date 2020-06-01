import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Dimensions,} from "react-native";
import { connect } from "react-redux";
import { handleAddDeck } from "../../actions/decks";

function AddDeck(props) {
  const [title, setTitle] = useState("");
  const createDeck = async (title) => {
    if (title) {
      setTitle("");
      let action = await props.dispatch(handleAddDeck(title)); 
      props.navigation.navigate("DECKS"); 
      props.navigation.push("DeckScreen", { deckId: action.deck.id });
    }
  };
  return (
    <View style={viewStyles.container}>
      <View>
        <Text style={{ fontSize: 18 }}>
          What is the title of your new deck?
        </Text>
      </View>
      <View style={viewStyles.textInput}>
        <TextInput
          placeholder="Deck Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => createDeck(title)} style={viewStyles.btn}>
          <Text style={{ alignSelf: "center", color: "white" }}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default connect()(AddDeck);


const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: Dimensions.get("window").width * 0.75,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    margin: 14,
    padding: 4,
  },
  btn: {
    borderWidth: 1,
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 5,
    borderColor: "#ccc",
    height: 38,
    justifyContent: "center",
    backgroundColor: "#00b2ff",
  },
});

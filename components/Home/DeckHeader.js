import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
function DeckHeader(props) {
  if (props.deck) {
    console.log(props);
    const { title, questions } = props.deck;
    return (
      <View>
        <Text style={{ color: "white" }}>{title}</Text>
        <Text style={{ color: "white" }}>{questions.length} Cards</Text>
      </View>
    );
  }
  return null;
}
const mapStateToProps = ({ decks }, { deckId }) => ({ deck: decks[deckId] });
export default connect(mapStateToProps)(DeckHeader);

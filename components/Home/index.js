import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../../actions/shared";
import DeckHeader from "./DeckHeader";
function Home(props) {
  const { deckIds } = props;
  console.log("HomeScreen props", props);
  useEffect(() => {
    console.log("Hello Hooks");
    props.getInitialData();
  }, []); 
  const onDeckPress = (deckId) => {
    props.navigation.push("DeckScreen", { deckId });
  };
  return (
    <SafeAreaView style={styles.container}>
      {deckIds.length === 0 && (
        <View style={[styles.container]}>
          <View style={styles.noDecks}>
            <Text>Start Adding your decks and test your knowledge</Text>
          </View>
        </View>
      )}
      <FlatList
        data={deckIds}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.deckHeader]}
            onPress={() => onDeckPress(item)}
          >
            <DeckHeader deckId={item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
const mapStateToProps = ({ decks }) => ({ deckIds: Object.keys(decks) });
const mapDispatchToProps = (dispatch) => ({
  getInitialData: () => dispatch(handleInitialData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  deckHeader: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#bbb",
    margin: 10,
    padding: 10,
    width: Dimensions.get("window").width * 0.7,
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
  },
  noDecks: {
    borderWidth: 1,
    padding: 15,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: "#00ffb2",
  },
});

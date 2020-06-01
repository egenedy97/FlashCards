import React from "react";
import { StyleSheet, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import Home from "./components/Home";
import AddDeck from "./components/Add_Deck/AddDeck";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DeckScreen from "./components/DeckScreen/DeckScreen";
import AddCard from "./components/AddCard/AddCard";
import Quiz from "./components/QuizSystem/Quiz";
import QuizResult from "./components/QuizSystem/QuizResult";
const Tab = createMaterialBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      barStyle={[viewStyles.center, viewStyles.tabBar]}
      activeColor="white"
      inactiveColor="#ddd"
    >
      <Tab.Screen
        name="DECKS"
        component={Home}
        options={{
          title: "Decks",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cards-playing-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddDeck"
        component={AddDeck}
        options={{
          title: "Add Deck",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="layers-plus"
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();
export default function App() {
  const store = createStore(reducer, middleware);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View styles={viewStyles.statusBar}></View>
        <Stack.Navigator>
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="DeckScreen" component={DeckScreen} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen
            name="QuizResult"
            component={QuizResult}
            options={{ title: "Results" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const viewStyles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignContent: "center",
  },
  statusBar: { marginBottom: 20 },
  tabBar: {
    backgroundColor: "#00b2ff",
  },
});

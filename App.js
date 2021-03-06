import React from "react";
import { Alert } from "react-native";
import "react-native-gesture-handler";

// Import the Views Components
import Home from "./components/Home";
import Chat from "./components/Chat";

// Import React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LogBox } from "react-native";

// Create the navigator
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  // Alert the user input
  alertMyText(input = []) {
    Alert.alert(input.text);
  }

  render() {
    LogBox.ignoreAllLogs();
    return (
      <NavigationContainer>
        {/* Initialize the App from Home View */}
        <Stack.Navigator initialRouteName="Home">
          {/* Allows the user switch screens */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            /*
            options={({ route }) => ({
              title: route.params.name,
              headerShown: false,
            })}
           */
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

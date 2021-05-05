import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bgColor: "#f5f5f5",
    };
  }

  render() {
    // Import the image for Home background
    const image = require("../assets/image-home-background.png");
    const name = this.state.name;
    const bgColor = this.state;

    // Event handler; when the user clicks the 'Start chatting' button
    // without completing the input with a name, it shows an alert
    var onPressChat = (name, bgColor) => {
      if (name === "") {
        return Alert.alert("Please enter a name to continue.");
      }
      this.props.navigation.navigate("Chat", {
        name: this.state.name,
        bgColor: this.state.bgColor,
      });
    };

    return (
      // Set image background for Home screen
      <ImageBackground source={image} style={styles.backgroundHome}>
        {/* Prevent keyboard from hiding input field in Android devices */}
        <KeyboardAvoidingView
          style={styles.wrapHome}
          behavior="height"
          keyboardVerticalOffset={Platform.select({
            ios: () => 200,
            android: () => 200,
          })()}
        >
          <Text style={styles.mainTitle}>Connect App</Text>

          {/* Create container for remaining app components */}
          <View style={styles.userContainer}>
            <View style={styles.inputContainer}>
              <Icon
                style={styles.inputIcon}
                name="person-outline"
                color="#000"
                size={25}
              />

              <TextInput
                accessible={true}
                accessibilityLabel="Input name"
                accessibilityHint="You have to introduce your name for the chat"
                accessibilityRole="keyboardkey"
                style={styles.wrapTextInput}
                // When the name is changed, store as state to pass to Chat screen
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>

            {/* Selection of background color for the chat view */}
            <View style={styles.backgroundColorContainer}>
              <Text style={styles.backgroundColorText}>
                Choose Background Color:
              </Text>

              <View style={styles.bgColorContainer}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Black background"
                  accessibilityHint="Choose background color"
                  accessibilityRole="button"
                  style={styles.bgColor1}
                  onPress={() => {
                    this.setState({ bgColor: "#090C08" });
                  }}
                ></TouchableOpacity>

                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Purple background"
                  accessibilityHint="Choose background color"
                  accessibilityRole="button"
                  style={styles.bgColor2}
                  onPress={() => {
                    this.setState({ bgColor: "#474056" });
                  }}
                ></TouchableOpacity>

                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Pale purple background"
                  accessibilityHint="Choose background color"
                  accessibilityRole="button"
                  style={styles.bgColor3}
                  onPress={() => {
                    this.setState({ bgColor: "#8A95A5" });
                  }}
                ></TouchableOpacity>

                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Pale green background"
                  accessibilityHint="Choose background color"
                  accessibilityRole="button"
                  style={styles.bgColor4}
                  onPress={() => {
                    this.setState({ bgColor: "#B9C6AE" });
                  }}
                ></TouchableOpacity>
              </View>
            </View>

            {/* Create buttons for user to select background color, store as state to pass to Chat screen */}
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Start button"
              accessibilityHint="Start your chat"
              accessibilityRole="button"
              style={styles.goChatButton}
              onPress={() => onPressChat(name, bgColor)}
            >
              <Text style={styles.goChatButtonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 60 }} />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

//---------- Styles ----------//
const styles = StyleSheet.create({
  wrapHome: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundHome: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  wrapTextInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },

  mainTitle: {
    position: "relative",
    textAlign: "center",
    margin: 20,
    marginRight: "auto",
    marginLeft: "auto",
    color: "#FFFFFF",
    top: 100,
    height: "44%",
    fontSize: 45,
    fontWeight: "bold",
  },

  userContainer: {
    width: "88%",
    marginTop: 65,
    height: 300,
    justifyContent: "space-between",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "white",
    borderRadius: 3,
  },

  inputContainer: {
    flexDirection: "row",
    position: "relative",
    width: "88%",
    padding: 10,
    marginTop: 15,
    marginRight: "auto",
    marginLeft: "auto",
    borderColor: "#757083",
    borderWidth: 2,
    borderRadius: 3,
  },

  inputIcon: {
    fontSize: 10,
    paddingRight: 5,
    color: "#757083",
    opacity: 0.2,
  },

  wrapTextInput: {
    fontSize: 16,
    width: "100%",
    fontWeight: "300",
    opacity: 50,
    color: "#757083",
  },

  backgroundColorContainer: {
    flexDirection: "column",
  },

  backgroundColorText: {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 16,
    fontWeight: "500",
    color: "#757083",
  },

  bgColorContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  bgColor1: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
  },

  bgColor2: {
    backgroundColor: "#474056",
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
  },

  bgColor3: {
    backgroundColor: "#8A95A5",
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
  },

  bgColor4: {
    backgroundColor: "#B9C6AE",
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
  },

  goChatButton: {
    width: "88%",
    backgroundColor: "#757083",
    margin: 20,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    fontWeight: "600",
    padding: 15,
    borderRadius: 3,
  },

  goChatButtonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

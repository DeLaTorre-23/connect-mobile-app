import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Alert,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  renderBubble,
  renderMessageText,
  renderSystemMessage,
} from "./MessageView";

// Import the Gifted Chat Library
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
} from "react-native-gifted-chat";

//import MapView from "react-native-maps";
// Import the storage system for React Native
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import package to know if a user is on- or offline
import NetInfo from "@react-native-community/netinfo";

import CustomActions from "./CustomActions";
import { NavigationEvents } from "react-navigation";
import MapView from "react-native-maps";

// Establish a connection from Firebase to Firestore
const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //name: "",
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,
      image: null,
      location: null,
      loggedInText: "Please wait, you are getting logged in",
    };

    // Firebase configuration for the App
    const firebaseConfig = {
      apiKey: "AIzaSyDXzxdIzMTM3C2GKVKN3EtXLpV0ePL0F_U",
      authDomain: "connect-app-96277.firebaseapp.com",
      projectId: "connect-app-96277",
      storageBucket: "connect-app-96277.appspot.com",
      messagingSenderId: "371363910486",
      appId: "1:371363910486:web:8b2d7e4a10829cda08fcf7",
      measurementId: "G-SVG879MG3M",
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Reference to load messages via Firebase
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    // Define props passed from Start screen
    var name = this.props.route.params.name;
    var bgColor = this.props.route.params.bgColor;

    // Populate user's name, if entered
    this.props.navigation.setOptions({ title: name, backgroundColor: bgColor });

    // Check if user is online
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });

        // Create a reference to the active user's documents (messages)
        this.referenceChatMessages = firebase
          .firestore()
          .collection("messages");

        // Authenticates user via Firebase
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              // Calls the Firebase Auth service for your app
              await firebase.auth().signInAnonymously();
            }

            // Update user state with currently active user data
            this.setState({
              //uid: user.uid,
              user: {
                _id: user.uid,
                name: name,
                avatar: "http://placeimg.com/140/140/any",
                createdAt: new Date(),
              },
              messages: [
                {
                  _id: 1,
                  text: "Hello developer",
                  createdAt: new Date(),
                  location: {
                    latitude: 48.864601,
                    longitude: 2.398704,
                  },
                  user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                  },
                },

                {
                  _id: 2,
                  text: "What's up?",
                  createdAt: new Date(),

                  user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                  },
                },
                /*
                {
                  _id: user.uid,
                  text: `${name} has entered the chat`,
                  createdAt: new Date(),
                  system: true,
                },
                */
              ],

              loggedInText: "",
            });

            // Listener for collection changes for current user
            this.unsubscribeChatUser = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });
        console.log("online");
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
        Alert.alert("You are currently offline, unable to send messages");
        console.log("offline");
      }
    });
  }

  componentWillUnmount() {
    // Stops listening for authentication
    this.unsubscribeChatUser();
    // Stops listening for changes
    this.authUnsubscribe;
  }

  // Load messages from client-side storage when offline
  async getMessages() {
    let messages = [];
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Adds messages to the Firebase storage collection
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      uid: this.state.uid,
      createdAt: message.createdAt,
      text: message.text || "",
      user: message.user,
      image: message.image || "",
      location: message.location || null,
    });
  }

  // Saves messages in client-side storage
  async saveMessage() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // Append new message to messages array
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessage();
      }
    );
  }

  // Delete messages in client-side storage
  async deleteMessage() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Update messages state when new message is added to Firestore database
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text || null,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || "",
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  // Hide input bar if user is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: "bgcolor",
          }}
          primaryStyle={{ alignItems: "center" }}
        />
      );
    }
  }

  //Import the possibility to the input text to personalize it
  renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={{
        color: "#000",
        backgroundColor: "#EDF1F7",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#E4E9F2",
        paddingTop: 8.5,
        paddingHorizontal: 15,
        paddingBottom: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
      }}
    />
  );

  //Import the render of to the send button on Chat View
  renderSend = (props) => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{ width: 30, height: 30 }}
        source={require("../assets/send-icon.png")}
      />
    </Send>
  );

  // Import CustomActions to display ActionSheet
  renderCustomActions = (props) => <CustomActions {...props} />;

  // Render view of map if location is included in message
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: Number(currentMessage.location.latitude),
            longitude: Number(currentMessage.location.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    const bgColor = this.props.route.params.bgColor;
    const { name } = this.props.route.params;
    const { navigate } = this.props.navigation;

    //---------- Styles ----------//
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: bgColor,
      },

      bottomColorOverride: {
        backgroundColor: bgColor,
      },
    });

    return (
      <View style={styles.container}>
        {/*
        <Text>{this.state.loggedInText}</Text>
        
        */}

        {/* Render the message inside of the speech bubbles */}
        <GiftedChat
          renderBubble={renderBubble}
          renderMessageText={renderMessageText}
          renderSystemMessage={renderSystemMessage}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderComposer={this.renderComposer}
          renderCustomView={this.renderCustomView}
          renderSend={this.renderSend}
          isConnected={this.state.isConnected}
          messages={this.state.messages}
          renderUsernameOnMessage
          showUserAvatar
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            avatar: this.state.user.avatar,
            name: this.state.user.name,
          }}
        />

        {/* Prevent keyboard from hiding input field in Android devices */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
        <View style={styles.bottomColorOverride}></View>
      </View>
    );
  }
}

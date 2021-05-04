import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import firebase from "firebase";
import "firebase/firestore";

export default class CustomActions extends React.Component {
  constructor() {
    super();
  }

  // Displays ActionSheet when user clicks action button
  onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick up an image");
            return this.pickImage();
          case 1:
            console.log("user wants to take a photo");
            return this.takePhoto();
          case 2:
            console.log("user wants to get their location");
            return this.getLocation();
          default:
        }
      }
    );
  };

  // Allows user to access to their library to send a picture
  pickImage = async () => {
    // Asks user for permission to access library
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    try {
      if (status === "granted") {
        // Launches image gallery to select image
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));

        // Loads image to db and sends image in chat
        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl, text: "" });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Allows user to access their camera to take a picture
  takePhoto = async () => {
    // Asks user for permission to access library
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );

    try {
      if (status === "granted") {
        // Launches image gallery to select image
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));

        // Loads image to db
        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl, text: "" });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Get and send user's location
  getLocation = async () => {
    try {
      // Asks user for permission to access location
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === "granted") {
        // Gets user's location
        const result = await Location.getCurrentPositionAsync(
          {}
        ).catch((error) => console.log(error));
        const longitude = JSON.stringify(result.coords.longitude);
        const latitude = JSON.stringify(result.coords.latitude);

        // Sends location
        if (result) {
          this.props.onSend({
            location: {
              longitude: longitude,
              latitude: latitude,
            },
            text: "",
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Upload image to firebase cloud storage as blob
  uploadImageFetch = async (uri) => {
    try {
      // Convert image to blob
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (error) {
          console.log(error);
          reject(new TypeError("Network request failed"));
        };
        // Opens connection to receive image data
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      // Creates unique file name for storage
      const uriParse = uri.split("/");
      const fileName = uriParse[uriParse.length - 1];

      // References Firestore
      const ref = firebase.storage().ref().child(`${fileName}`);
      const snapshot = await ref.put(blob);
      blob.close();

      // Returns image's unique URL from database
      return await snapshot.ref.getDownloadURL();
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Let's you choose to send an image from your photo library, take a photo, or send your geolocation."
        accessibilityRole="button"
        style={[styles.container]}
        onPress={this.onActionPress}
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
    backgroundColor: "red",
  },
  iconText: {
    color: "#050",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

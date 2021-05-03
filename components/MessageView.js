import React from "react";
import { Bubble, SystemMessage, MessageText } from "react-native-gifted-chat";

// Change styles for chat bubbles
const renderBubble = (props) => (
  <Bubble
    {...props}
    wrapperStyle={{
      left: {
        paddingTop: 10,
        borderRadius: 25,
        borderBottomLeftRadius: 5,
        backgroundColor: "#757083",
      },
      right: {
        paddingTop: 10,
        borderRadius: 25,
        borderBottomRightRadius: 5,
        backgroundColor: "#c7bcde",
      },
    }}
  />
);

// Change styles for the text inside of the bubbles
const renderMessageText = (props) => (
  <MessageText
    {...props}
    textStyle={{
      left: {
        color: "#fff",
      },
      right: {
        color: "#fff",
      },
    }}
    linkStyle={{
      left: {
        color: "#117a65",
      },
      right: {
        color: "#117a65",
      },
    }}
    customTextStyle={{ fontSize: 18 }}
  />
);

// Change styles for system message
const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    textStyle={{
      color: "lavender",
      fontWeight: "900",
    }}
  />
);

export { renderBubble, renderMessageText, renderSystemMessage };

{
  /*
backgroundColor: "#117a65",
backgroundColor: "#81c784",
backgroundColor: "#f7dc6f",
backgroundColor: "#fff59d",
backgroundColor: "#f5f5f5",
*/
}

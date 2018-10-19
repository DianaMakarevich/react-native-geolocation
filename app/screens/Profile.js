import React from "react";
import firebase from "firebase";
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";

export default class Profile extends React.Component{
  _onPressSignOutButton = () => {
    firebase.auth().signOut()
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title="John Doe">
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
          </View>
          <Button
            buttonStyle={{ marginTop: 10 }}
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={this._onPressSignOutButton}
          />
        </Card>
      </View>
    )
  }
};
import React from "react";
import firebase from "firebase";
import { createRootNavigator } from "./app/router";

export default class App extends React.Component {
    state = {
      signedIn: false,
      loggedIn: null,
    };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBHdH-paQD2tDEwKnbMCpxBF-mmKlLYRzQ",
      authDomain: "rnwithmap.firebaseapp.com",
      databaseURL: "https://rnwithmap.firebaseio.com",
      projectId: "rnwithmap",
      storageBucket: "rnwithmap.appspot.com",
      messagingSenderId: "22531109422"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true, signedIn: true})
      } else {
        this.setState({loggedIn: false, signedIn: false})
      }
    })
  }

  render() {
    const { signedIn } = this.state;

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}

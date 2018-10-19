import React, { Component } from 'react';
import firebase from 'firebase';
import { View, StatusBar, Text } from 'react-native';
import { Card, Input, Button } from "react-native-elements"; 
import { Spinner } from '../common';

export default class SignUp extends Component {
  state = { email: '', password: '', error: '', loading: false }

  _handleUsernameInput = value => {
    this.setState({
      email: value
    })
  }

  _handlePasswordInput = value => {
    this.setState({
      password: value
    })
  }

  _onPressSignUpButton = () => {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true })

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this._onSignUpSuccessful)
      .catch(this._onSignUpFail)
  }

  _onSignUpFail = () => {
    this.setState({ error: 'Something goes wrong =(', loading: false })
  }

  _onSignUpSuccessful = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
  }

  _renderButton = () => {
    return this.state.loading ? <Spinner size='small' /> : 
      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN UP"
        onPress={this._onPressSignUpButton}
      />
  }

  render() {
    const { navigation } = this.props;
    const { error } = this.state;

    return(
      <View>
        <StatusBar barStyle="dark-content"/> 
        <Card>
          <Input 
            placeholder='Username'
            label='Enter Username'
            containerStyle={{marginLeft: 15, marginBottom: 15}}
            onChangeText={this._handleUsernameInput}
          />
          <Input 
            placeholder='Password'
            label='Enter Password'
            secureTextEntry
            containerStyle={{marginLeft: 15}}
            onChangeText={this._handlePasswordInput}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={this._onPressSignUpButton}
          />
          <Button
            buttonStyle={{ 
              marginTop: 20,
              backgroundColor: 'transparent',
              elevation: 0 
            }}
            title="SIGN IN"
            titleStyle={{color: 'black'}}
            onPress={() => navigation.navigate("SignIn")}
          />
          <Text style={styles.errorStyles}>{error}</Text>
        </Card>
      </View>
    )
  }
}

const styles = {
  errorStyles: {
    color: 'red',
    textAlign: 'center',
    fontSize: 24
  }
}
import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Card, Input, Button, Text } from 'react-native-elements';
import { Spinner } from '../common';

export default class SignIn extends Component {
  state = { email: '', password: '', error: '', loading: false }

  onPressSignInButton = () => {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this._onLoginSuccessful)
      .catch(this._onLoginFail);
  }

  _onLoginFail = () => {
    this.setState({ error: 'Something goes wrong =(', loading: false })
  }

  _onLoginSuccessful = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    }, () => this.props.navigation.navigate('Home'))
  }

  _handleEmailInput = (value) => {
    this.setState({email: value})
  }

  _handlePasswordInput = (value) => {
    this.setState({password: value})
  }

  _renderButton = () => {
    return this.state.loading ? <Spinner size='small' /> : 
      <Button 
        title='SIGN IN'
        buttonStyle={{ 
          marginTop: 20,
          elevation: 0 
        }}
        onPress={this.onPressSignInButton}
      />
  }

  render() {
    const { navigation } = this.props;
    const { error } = this.state;

    return (
      <View>
        <Card>
          <Input 
            placeholder='Enter username'
            label='Username'
            containerStyle={{marginLeft: 15, marginBottom: 15}}
            onChangeText={this._handleEmailInput}
          />
          <Input 
            placeholder='Enter password'
            label='Password'
            secureTextEntry
            containerStyle={{marginLeft: 15}}
            onChangeText={this._handlePasswordInput}
          />
          {this._renderButton()}
          <Text style={styles.errorStyles}>{error}</Text>
        </Card>
      </View>
    )
  }
}

const styles = {
  errorStyles: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
    fontSize: 24
  }
}
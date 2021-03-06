import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {emailChange} from '../actions';
import {passwordChange, loginUser} from '../actions';

export class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChange(text);
  }
  onPasswordChange(text) {
    this.props.passwordChange(text);
  }

  onButtonPress() {
    const {email, password} = this.props;
    this.props.loginUser({email, password});
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loadig) {
      return <ActivityIndicator size="small" color="#0000ff" />;
    }
    return <Button title="login" onPress={this.onButtonPress.bind(this)} />;
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: 'pink'}}>
        <View style={{marginBottom: 10}}>
          <Image
            style={{
              height: 250,
              width: '100%',
            }}
            source={require('../images/login.jpg')}
            resizeMode="stretch"
          />
          <TextInput
            placeholder="email"
            style={{borderColor: 'red', borderWidth: 2, marginVertical: 2}}
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="password"
            style={{borderColor: 'red', borderWidth: 2, marginVertical: 2}}
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="password"
            style={{borderColor: 'red', borderWidth: 2, marginVertical: 2}}
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="password"
            style={{borderColor: 'red', borderWidth: 2, marginVertical: 2}}
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            autoCapitalize="none"
          />

          {this.renderError()}
          {this.renderButton()}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loadin: state.auth.loadig,
  };
};

export default connect(mapStateToProps, {
  emailChange,
  passwordChange,
  loginUser,
})(LoginForm);

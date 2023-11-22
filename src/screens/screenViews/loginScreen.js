import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

const bg = require('../../assets/images/loginbackground.png');
const lg = require('../../assets/images/logo-shopee.png');

import {connect} from 'react-redux';
import {loginAction, getIDAction} from '../../redux/auth/authActions';

import {pushToRegister} from '../../app-navigation/AppNavigation';
import * as AppController from '../../AppController';

const delay = ms => new Promise(res => setTimeout(res, ms));

class loginScreen extends React.Component {
  state = {
    username: '',
    password: '',
  };

  _userInput = value => {
    this.setState({username: value});
  };

  _passInput = value => {
    this.setState({password: value});
  };

  _Register = () => {
    pushToRegister(this.props.componentId);
  };

  _Login = async () => {
    AppController.startHome(this.props.id);
    // this.props.handleLogin(this.state.username, this.state.password);

    // await delay(1000);
    // if (this.props.token === true) {
    //   this.props.getID(this.state.username);

    //   await delay(1000);
    //   AppController.startHome(this.props.id);
    // } else {
    //   Alert.alert('Hệ thống', 'Đăng nhập thất bại!');
    // }
  };

  _Register = async () => {
    pushToRegister();
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={bg} style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={lg} style={styles.logo} />
          </View>

          <View style={styles.inputcontainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={'grey'}
              onChangeText={this._userInput}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={'grey'}
              onChangeText={this._passInput}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._Login}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._Register}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.authReducers.token,
    data: state.authReducers.userData,
    id: state.authReducers.appID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (user, pass) => {
      dispatch(loginAction(user, pass));
    },
    getID: tentk => {
      dispatch(getIDAction(tentk));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(loginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 200,
    height: 200,
  },

  inputcontainer: {
    width: '100%',
    alignItems: 'center',
  },

  input: {
    height: 50,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  registerContainer: {
    alignItems: 'center',
  },

  buttonContainer: {
    marginTop: 8,
    elevation: 8,
    backgroundColor: '#15D200',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 370,
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

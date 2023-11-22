import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {registerAction} from '../../redux/auth/authActions';
import {Navigation} from 'react-native-navigation';

const bg = require('../../assets/images/loginbackground.png');

const delay = ms => new Promise(res => setTimeout(res, ms));

class registerScreen extends React.Component {
  state = {
    hoten: '',
    email: '',
    tentk: '',
    mk: '',
    xacnhan_mk: '',
  };

  _hotenInput = text => {
    this.setState({hoten: text});
  };

  _emailInput = text => {
    this.setState({email: text});
  };

  _tkInput = text => {
    this.setState({tentk: text});
  };

  _mkInput = text => {
    this.setState({mk: text});
  };

  _xacnhanmkInput = text => {
    this.setState({xacnhan_mk: text});
  };

  _Register = async () => {
    if (
      this.state.username === '' ||
      this.state.pass === '' ||
      this.state.security_pass === ''
    ) {
      Alert.alert(
        'Hệ thống',
        'Tên tài khoản và mật khẩu không được bỏ trống!!',
      );
    } else if (this.state.pass !== this.state.security_pass) {
      Alert.alert('Hệ thống', 'Mật khẩu không trùng khớp!');
    } else {
      this.props.handleRegis(
        this.state.hoten,
        this.state.email,
        this.state.tentk,
        this.state.mk,
      );

      await delay(1000);
      Navigation.dismissModal(this.props.componentId);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={bg} style={styles.container}>
          <View style={styles.inputcontainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={'grey'}
              onChangeText={this._hotenInput}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'grey'}
              onChangeText={this._emailInput}
            />

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={'grey'}
              onChangeText={this._tkInput}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={'grey'}
              onChangeText={this._mkInput}
              secureTextEntry={true}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={'grey'}
              onChangeText={this._xacnhanmkInput}
              secureTextEntry={true}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._Register}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.authReducers.userData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleRegis: (hoten, email, user, pass) => {
      dispatch(registerAction(hoten, email, user, pass));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(registerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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

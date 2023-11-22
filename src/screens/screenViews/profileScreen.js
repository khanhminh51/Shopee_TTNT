import React from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import ScreenIDs from '../ScreenIDs';
import {detailAction, detailUpdate} from '../../redux/auth/authActions';
import {connect} from 'react-redux';

const delay = ms => new Promise(res => setTimeout(res, ms));
const bg = require('../../assets/images/loginbackground.png');

class profileScreen extends React.Component {
  state = {
    isEditable: false,
    updateName: '',
    updateEmail: '',
    updateTK: '',
    updateMK: '',
  };

  async componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.props.loadDetail(this.props.idtk);

    await delay(1000);
    this._loadDetail(
      this.props.detail.Hoten,
      this.props.detail.Email,
      this.props.detail.TenTK,
      this.props.detail.MK,
    );
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'btnToggle') {
      Navigation.mergeOptions('CenterStack', {
        sideMenu: {
          left: {
            width: 310,
            visible: true,
            enabled: false,
          },
        },
      });
    }
  }

  _loadDetail = (ten, email, tk, mk) => {
    this.setState({updateName: ten});
    this.setState({updateEmail: email});
    this.setState({updateTK: tk});
    this.setState({updateMK: mk});
  };
  _nameUpdate = text => {
    this.setState({updateName: text});
  };

  _emailUpdate = text => {
    this.setState({updateEmail: text});
  };

  _tkUpdate = text => {
    this.setState({updateTK: text});
  };

  _mkUpdate = text => {
    this.setState({updateMK: text});
  };

  _editPress = () => {
    this.setState({isEditable: true});
  };

  _updatePress = async () => {
    this.setState({isEditable: false});

    await delay(500);

    this.props.updateUser(
      this.props.idtk,
      this.state.updateName,
      this.state.updateEmail,
      this.state.updateTK,
      this.state.updateMK,
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={bg} style={styles.container}>
          <View style={styles.avatarContainer}>
            <View style={styles.defaultavatar}>
              <Image
                style={{zIndex: 100, color: 'black', width: 100, height: 118}}
                source={require('../../assets/images/defaultAvatar.png')}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInputBox}
              value={this.state.updateName}
              onChangeText={newText => this._nameUpdate(newText)}
              editable={this.state.isEditable}
              placeholder="Full Name"
            />

            <TextInput
              style={styles.textInputBox}
              value={this.state.updateEmail}
              onChangeText={newText => this._emailUpdate(newText)}
              editable={this.state.isEditable}
              placeholder="Email"
            />

            <TextInput
              style={styles.textInputBox}
              value={this.state.updateTK}
              onChangeText={newText => this._tkUpdate(newText)}
              editable={this.state.isEditable}
              placeholder="Username"
            />

            <TextInput
              style={styles.textInputBox}
              value={this.state.updateMK}
              onChangeText={newText => this._mkUpdate(newText)}
              editable={this.state.isEditable}
              secureTextEntry={true}
              placeholder="Password"
            />
          </View>

          <View style={{alignItems: 'center'}}>
            {!this.state.isEditable ? (
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._editPress}>
                <Text style={styles.buttonText}>Sửa thông tin</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._updatePress}>
                <Text style={styles.buttonText}>Cập nhật</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    detail: state.authReducers.detailUser,
    userData: state.authReducers.userData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadDetail: user => {
      dispatch(detailAction(user));
    },
    updateUser: (id, ten, email, tk, mk) => {
      dispatch(detailUpdate(id, ten, email, tk, mk));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(profileScreen);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },

  avatarContainer: {
    padding: 16,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  defaultavatar: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
  },

  img: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },

  detailContainer: {
    alignItems: 'center',
  },

  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },

  textInputBox: {
    height: 50,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black'
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

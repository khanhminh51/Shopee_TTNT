import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenIDs from '../ScreenIDs';
import * as AppController from '../../AppController';
import {connect} from 'react-redux';
import {detailAction} from '../../redux/auth/authActions';

class sideMenu extends React.Component {
  _navigate(screenID) {
    Navigation.setRoot({
      root: {
        sideMenu: {
          id: 'CenterStack',
          center: {
            stack: {
              children: [
                {
                  component: {
                    name: screenID,
                    passProps: {
                      idtk: this.props.idtk,
                    },
                    options: {
                      layout: {
                        orientation: ['portrait'],
                      },
                    },
                  },
                },
              ],
            },
          },
          left: {
            component: {
              name: ScreenIDs.sideMenu,
              passProps: {
                idtk: this.props.idtk,
              },
            },
          },
        },
      },
    });
  }

  async _backToLogin() {
    Alert.alert('Hệ thống', 'Đăng xuất thành công');

    AppController.startlogin();
  }

  async componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.props.loadDetail(this.props.idtk);
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuList}>
          <View style={styles.containerMenu}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => AppController.startHome(this.props.idtk)}>
              <Icon name="home-sharp" size={25} />
              <Text style={{marginLeft: 20, fontSize: 24}}>Store</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerMenu}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => this._navigate(ScreenIDs.Profile)}>
              <Icon name="person-circle" size={25} />
              <Text style={{marginLeft: 20, fontSize: 24}}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerMenu}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => this._navigate(ScreenIDs.Cart)}>
              <Icon name="cart-sharp" size={25} />
              <Text style={{marginLeft: 20, fontSize: 24}}>Cart</Text>
            </TouchableOpacity>
          </View>
          {/* {this.props.detail.role === 'admin' ? (
            <View style={styles.containerMenu}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => this._navigate(ScreenIDs.Admin)}>
                <Icon name="logo-android" size={25} />
                <Text style={{marginLeft: 20, fontSize: 24}}>Admin</Text>
              </TouchableOpacity>
            </View>
          ) : null} */}
        </View>
        <View style={styles.containerLogout}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={this._backToLogin}>
            <Text style={{marginLeft: 20, fontSize: 20, color: 'red'}}>
              Đăng Xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    detail: state.authReducers.detailUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadDetail: user => {
      dispatch(detailAction(user));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(sideMenu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8244',
  },

  menuList: {
    flex: 0.92,
  },

  containerMenu: {
    flex: 0.1,
    marginTop: 20,
  },

  menuButton: {
    paddingLeft: 30,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: 'auto',
  },

  containerLogout: {
    flex: 0.08,
  },

  logoutButton: {
    paddingLeft: 30,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: 'auto',
    backgroundColor: '#393954',
  },
});

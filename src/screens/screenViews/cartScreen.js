import React from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {tinhTongTien} from '../../redux/itemList/itemlistActions';

// const bg = require('../../assets/images/loginbackground.png');

class cartScreen extends React.Component {
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
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

  formatCurrency(value) {
    const currencyFormatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    return currencyFormatter.format(value);
  }

  render() {
    const total = this.props.data.reduce(
      (total, item) => total + item.Price,
      0,
    );

    const shipFee = this.formatCurrency(25000);
    const formattedTotal = this.formatCurrency(total);
    const totalFee = this.formatCurrency(25000 + total);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.listContainer}>
          {this.props.data &&
            this.props.data.map(item => (
              <View style={styles.itemContainer} key={item.ID}>
                <View style={styles.itemImage}>
                  <Image
                    source={{uri: item.img}}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderBottomLeftRadius: 15,
                      borderTopLeftRadius: 15,
                    }}
                  />
                </View>
                <View style={styles.itemDetail}>
                  <View>
                    <Text>{item.Name}</Text>
                  </View>
                  <View>
                    <Text style={{color: '#FF501B'}}>
                      {this.formatCurrency(item.Price)}
                    </Text>
                  </View>
                </View>
                <View style={styles.itemQuantity}>
                  <Pressable>
                    <AntDesign
                      style={{textAlign: 'center'}}
                      name="minussquare"
                      size={24}
                      color="#FFBC1E"
                    />
                  </Pressable>
                  <View
                    style={{
                      width: '35%',
                      height: '26%',
                      backgroundColor: 'white',
                    }}>
                    <Text style={{textAlign: 'center'}}>1</Text>
                  </View>
                  <Pressable>
                    <AntDesign
                      style={{textAlign: 'center'}}
                      name="plussquare"
                      size={24}
                      color="#FFBC1E"
                    />
                  </Pressable>
                </View>
                <View style={styles.deleteItem}>
                  <Pressable>
                    <MaterialCommunityIcons
                      style={{textAlign: 'center'}}
                      name="delete"
                      size={36}
                      color="red"
                    />
                  </Pressable>
                </View>
              </View>
            ))}
        </ScrollView>

        <View style={styles.price}>
          <View style={styles.contentPrice}>
            <View style={styles.detailPrice}>
              <Text>Sub total</Text>
              <Text>{formattedTotal}</Text>
            </View>
            <View style={styles.detailPrice}>
              <Text>Shipping</Text>
              <Text>{shipFee}</Text>
            </View>
            <View style={styles.detailPrice}>
              <Text>Total</Text>
              <Text>{totalFee}</Text>
            </View>
          </View>
        </View>

        <View style={styles.orderBtn}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.itemlistReducers.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(cartScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE7BC',
    display: 'flex',
    flexDirection: 'column',
  },
  //Item in cart
  listContainer: {
    height: '75%',
    // alignItems: 'center',
  },

  itemContainer: {
    marginTop: 20,
    backgroundColor: '#F3F3F3',
    display: 'flex',
    flexDirection: 'row',
    height: 120,
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 15,
  },

  itemImage: {
    // borderWidth: 1,
    width: '25%',
  },
  itemDetail: {
    // borderWidth: 1,
    paddingLeft: 5,
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  itemQuantity: {
    display: 'flex',
    flexDirection: 'row',
    // borderWidth: 1,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteItem: {
    // borderWidth: 1,
    width: '15%',
    justifyContent: 'center',
  },
  //Price
  //PRICE
  price: {
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentPrice: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  detailPrice: {
    padding: 5,
    height: '33.33%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //ORDER
  orderBtn: {
    height: '30%',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 12,
    elevation: 10,
    backgroundColor: '#FF501B',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

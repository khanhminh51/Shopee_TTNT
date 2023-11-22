import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {
  addToCart,
  getDetailItemAction,
} from '../../redux/itemList/itemlistActions';
import {Navigation} from 'react-native-navigation';

const delay = ms => new Promise(res => setTimeout(res, ms));
const bg = require('../../assets/images/loginbackground.png');

class detailScreen extends React.Component {
  state = {
    itemName: '',
    itemDesc: '',
    itemimg: '',
    itemTag: [],
    itemPrice: 0,
  };

  async componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.props.loadDetailItem(this.props.iditem);

    await delay(1000);
    this._loadDetail(
      this.props.data.Name,
      this.props.data.Desc,
      this.props.data.img,
      this.props.data.Category,
      this.props.data.Price,
    );
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'btnBack') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  _loadDetail(name, desc, img, category, price) {
    this.setState({itemName: name});
    this.setState({itemDesc: desc});
    this.setState({itemimg: img});
    this.setState({itemTag: category});
    this.setState({itemPrice: price});
  }

  formatCurrency(value) {
    const currencyFormatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    return currencyFormatter.format(value);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <View style={styles.inforItem}>
            <View style={styles.imageContainer}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderBottomLeftRadius: 40,
                }}
                source={{uri: this.state.itemimg}}
              />
            </View>
            <View style={styles.rightInfor}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{this.state.itemName}</Text>
              </View>
              <Text style={{color: 'red', marginTop: 20}}>*Chọn size</Text>
              <View style={styles.sizeContainer}>
                <TouchableOpacity style={styles.sizeBtn}>
                  <Text style={styles.sizeBtnText}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sizeBtn}>
                  <Text style={styles.sizeBtnText}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sizeBtn}>
                  <Text style={styles.sizeBtnText}>L</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rating}>
                <Text style={{color: 'black', paddingRight: 5}}>Đánh giá:</Text>
                <FontAwesome name="star" size={22} style={{color: '#FF501B'}} />
                <FontAwesome name="star" size={22} style={{color: '#FF501B'}} />
                <FontAwesome name="star" size={22} style={{color: '#FF501B'}} />
                <FontAwesome name="star" size={22} style={{color: '#FF501B'}} />
                <FontAwesome
                  name="star-half-empty"
                  size={22}
                  style={{color: '#FF501B'}}
                />
              </View>
              <View style={styles.sold}>
                <Text style={{color: 'black'}}>Đã bán: 9696</Text>
              </View>
            </View>
          </View>

          <View style={styles.descContainer}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <Text style={{color: '#FF501B', fontSize: 18}}>
                Thông tin chi tiết
              </Text>
              <Text style={styles.desc}>{'   ' + this.state.itemDesc}</Text>
            </ScrollView>
          </View>

          <View style={styles.priceContainer}>
            <Text style={{color: '#FF501B', fontSize: 20}}>Price:</Text>
            <Text style={styles.price}>
              {this.formatCurrency(this.state.itemPrice)}
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.Add(this.props.iditem);
                Navigation.dismissModal(this.props.componentId);
              }}>
              <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
              <FontAwesome5
                name="shopping-cart"
                size={22}
                style={{color: 'white'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.itemlistReducers.detailItem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadDetailItem: itemID => {
      dispatch(getDetailItemAction(itemID));
    },
    Add: itemID => {
      dispatch(addToCart(itemID));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(detailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFE7BC',
  },
  inforItem: {
    height: '32%',
    display: 'flex',
    flexDirection: 'row',
    borderBottomLeftRadius: 40,
    backgroundColor: '#FFE7BC',
  },
  imageContainer: {
    height: '100%',
    width: '50%',
  },
  rightInfor: {
    height: '100%',
    width: '50%',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingTop: 15,
    borderBottomRightRadius: 40,
  },
  titleContainer: {},

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    // fontStyle: 'italic',
    color: 'black',
  },
  sizeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  sizeBtn: {
    elevation: 8,
    backgroundColor: '#FF501B',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginRight: 15,
    marginTop: 10,
    width: 35,
  },

  sizeBtnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  rating: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  sold: {
    marginTop: 20,
  },
  descContainer: {
    height: '25%',
    justifyContent: 'center',
    marginTop: 25,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 40,
  },

  desc: {
    fontSize: 15,
    textAlign: 'justify',
    color: 'black',
  },

  priceContainer: {
    marginTop: 15,
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF501B',
  },
  button: {
    marginTop: 15,
    width: 280,
    height: 60,
    backgroundColor: '#FF501B',
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    marginRight: 15,
  },
});

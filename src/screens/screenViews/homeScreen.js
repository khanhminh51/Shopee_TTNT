import React from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import ScreenIDs from '../ScreenIDs';
import {connect} from 'react-redux';
import {showCategoryListAction} from '../../redux/itemList/itemlistActions';

const bg = require('../../assets/images/loginbackground.png');

class homeScreen extends React.Component {
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

  _getTag(tag) {
    this.props.loadTagItem(tag);
  }

  _detailModal(screenID, itemID) {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: screenID,
              passProps: {
                iditem: itemID,
              },
              options: {
                topBar: {
                  leftButtons: [
                    {
                      id: 'btnBack',
                      icon: require('../../assets/images/returnbutton.png'),
                      color: 'white',
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={bg} style={styles.container}>
          <View style={styles.categoryContainer}>
            <ScrollView
              contentContainerStyle={styles.categoryList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.listTag.map(tag => {
                return (
                  <TouchableOpacity
                    key={tag.Tag}
                    style={styles.categoryButton}
                    onPress={() => this._getTag(tag.Tag)}>
                    <Text style={{color: 'white'}}>{tag.Tag}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={true}>
            <View style={styles.containerList}>
              {this.props.itemListData.map(item => {
                return (
                  <TouchableOpacity
                    style={styles.itemContainer}
                    key={item.ID}
                    onPress={() =>
                      this._detailModal(ScreenIDs.DetailItem, item.ID)
                    }>
                    <View style={styles.item}>
                      <View style={styles.itemImage}>
                        <Image
                          source={{uri: item.img}}
                          style={{height: '100%', width: '100%'}}
                        />
                      </View>
                      <View style={styles.itemDetail}>
                        <Text style={{color: 'black'}}>{item.Name}</Text>
                        {/* <Text>
                          Tag:{'' + item.Category.map(tag => ' ' + tag.Tag)}
                        </Text> */}
                        <Text style={{color: 'black'}}>
                          Price: {this.formatCurrency(item.Price)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    itemListData:
      state.itemlistReducers.data.length <= 0
        ? state.itemlistReducers.itemListData
        : state.itemlistReducers.data,
    listTag: state.itemlistReducers.categoryData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadTagItem: tag => {
      dispatch(showCategoryListAction(tag));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(homeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8244',
  },

  categoryContainer: {
    // flex: 0.1,
    height: 80,
    alignItems: 'center',
  },

  categoryList: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  categoryButton: {
    backgroundColor: '#FF501B',
    width: 100,
    marginHorizontal: 5,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },

  containerList: {
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    height: 200,
    width: '45%',
    margin: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
  },
  itemImage: {
    height: '70%',
    width: '100%',
  },
  itemDetail: {
    paddingLeft: 5,
  },
});

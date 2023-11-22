import {Navigation} from 'react-native-navigation';
import ScreenIDs from '../screens/ScreenIDs';

const setDefaultOptions = () => {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: false,
    },
    topBar: {
      background: {
        color: '#0F0F16',
      },
      leftButtons: {
        id: 'btnToggle',
        icon: require('../assets/images/ic_menu.png'),
        color: 'white',
      },
    },
    bottomTabs: {
      backgroundColor: '#0F0F16',
    },
    bottomTab: {
      selectedIconColor: 'red',
      selectedTextColor: 'red',
    },
    navigationBar: {
      visible: false,
    },
  });
};

const pushToRegister = () => {
  Navigation.showModal({
    component: {
      name: ScreenIDs.Register,
      id: ScreenIDs.Register,
    },
  });
};

export {setDefaultOptions, pushToRegister};

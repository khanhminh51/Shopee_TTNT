import * as AppsController from './AppController';
import {Navigation} from 'react-native-navigation';
import {registerScreens} from './screens';
import {AppNavigation} from './app-navigation';

registerScreens();

const startApp = async () => {
  AppNavigation.setDefaultOptions();

  Navigation.events().registerAppLaunchedListener(async () => {
    return AppsController.startlogin();
  });
};

export default {start: startApp};

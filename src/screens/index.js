import {Navigation} from 'react-native-navigation';
import IDs from './ScreenIDs';

// Login/Register View
import loginScreen from './screenViews/loginScreen';
import registerScreen from './screenViews/registerScreen';

// Home View with side menu
import homeScreen from './screenViews/homeScreen';
import profileScreen from './screenViews/profileScreen';
import detailScreen from './screenViews/detailScreen';

// Sidemenu
import sideMenu from './screenViews/sideMenu';

import {Provider} from 'react-redux';
import store from '../redux';
import cartScreen from './screenViews/cartScreen';

const screens = {
  [IDs.Login]: loginScreen,
  [IDs.Register]: registerScreen,
  [IDs.Home]: homeScreen,
  [IDs.Profile]: profileScreen,
  [IDs.DetailItem]: detailScreen,
  [IDs.Cart]: cartScreen,
  [IDs.sideMenu]: sideMenu,
};

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

function registerScreens() {
  Object.keys(screens).map(screenID =>
    Navigation.registerComponent(screenID, () =>
      WrappedComponent(screens[screenID]),
    ),
  );
}

export {registerScreens, IDs};

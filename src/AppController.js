import {Navigation} from 'react-native-navigation';
import ScreenIDs from './screens/ScreenIDs';

export const startlogin = () =>
  Navigation.setRoot({
    root: {
      component: {
        name: ScreenIDs.Login,
        id: ScreenIDs.Login,
        options: {
          layout: {
            orientation: ['portrait'],
          },
        },
      },
    },
  });

export const startHome = tentk => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: 'CenterStack',
        center: {
          stack: {
            children: [
              {
                component: {
                  name: ScreenIDs.Home,
                  passProps: {
                    idtk: tentk,
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
              idtk: tentk,
            },
          },
        },
      },
    },
  });
};

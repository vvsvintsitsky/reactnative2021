import React from 'react';

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {ApiClient} from './src/api/client/ApiClient';
import {ApiClientContext} from './src/api/client/ApiClientContext';
import {API_BASE} from './src/api/constants';

import {MainScreen} from './src/screens/main/MainScreen';
import {ProductDetailsScreen} from './src/screens/product-details/ProductDetailsScreen';
import {MainRoutes} from './src/navigation/MainRoutes';
import {
  MainHeaderRight,
  MainHeaderLeft,
  MainHeaderTitle,
} from './src/screens/main/MainHeader';
import {
  ProductDetailsHeaderLeft,
  ProductDetailsHeaderRight,
} from './src/screens/product-details/ProductDetailsHeader';
import {DrawerRoutes} from './src/navigation/DrawerRoutes';
import {TrashScreen} from './src/screens/trash/TrashScreen';
import {Modals} from './src/navigation/Modals';
import {LoginToContinueModal} from './src/modals/login-to-continue/LoginToContinueModal';
import {useAuthentication} from './src/authentication/useAuthentication';
import {AuthenticationContext} from './src/authentication/AuthenticationContext';
import {SelectColorModal} from './src/modals/select-color/SelectColorModal';
import {ProductAddedModal} from './src/modals/product-added/ProductAddedModal';
import {ShareButton} from './src/share/ShareButton';
import {ProfileScreen} from './src/screens/profile/ProfileScreen';
import ProfileIcon from './assets/icons/Profile.svg';
import {styles as iconStyles} from './src/components/icon/styles';

const Drawer = createDrawerNavigator();
const MainRoutesStack = createStackNavigator();

const headerOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#008ACE',
  },
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 20,
  },
  headerTitleAlign: 'center',
};

function MainNavigationStack() {
  return (
    <MainRoutesStack.Navigator
      initialRouteName={MainRoutes.Main}
      screenOptions={headerOptions}>
      <MainRoutesStack.Group>
        <MainRoutesStack.Screen
          name={MainRoutes.Main}
          component={MainScreen}
          options={{
            title: MainHeaderTitle,
            headerLeft: () => <MainHeaderLeft />,
            headerRight: () => <MainHeaderRight />,
          }}
        />
        <MainRoutesStack.Screen
          name={MainRoutes.ProductDetails}
          component={ProductDetailsScreen}
          options={{
            title: '',
            headerLeft: () => <ProductDetailsHeaderLeft />,
            headerRight: () => <ProductDetailsHeaderRight />,
          }}
        />
      </MainRoutesStack.Group>
      <MainRoutesStack.Group
        screenOptions={{
          presentation: 'modal',
          title: '',
          headerLeft: () => <ProductDetailsHeaderLeft />,
          headerRight: () => <ProductDetailsHeaderRight />,
        }}>
        <MainRoutesStack.Screen
          name={Modals.LoginToContinue}
          component={LoginToContinueModal}
        />
        <MainRoutesStack.Screen
          name={Modals.ProductAddedToCart}
          component={ProductAddedModal}
        />
        <MainRoutesStack.Screen
          name={Modals.SelectColor}
          component={SelectColorModal}
        />
      </MainRoutesStack.Group>
    </MainRoutesStack.Navigator>
  );
}

function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <ShareButton />
    </DrawerContentScrollView>
  );
}

const App = () => {
  const [apiClient] = React.useState(() => new ApiClient(API_BASE));

  const {authentication, onAuthenticate} = useAuthentication();

  return (
    <ApiClientContext.Provider value={apiClient}>
      <AuthenticationContext.Provider value={{authentication, onAuthenticate}}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName={DrawerRoutes.Main}
            screenOptions={{
              headerShown: false,
              headerStyle: headerOptions.headerStyle,
              headerTintColor: headerOptions.headerTintColor,
              headerTitleStyle: headerOptions.headerTitleStyle,
              headerTitleAlign: headerOptions.headerTitleAlign,
            }}
            drawerContent={DrawerContent}>
            <Drawer.Screen
              name={DrawerRoutes.Main}
              component={MainNavigationStack}
            />
            <Drawer.Screen
              name={DrawerRoutes.Profile}
              component={ProfileScreen}
              options={{
                headerShown: true,
                drawerIcon: () => <ProfileIcon style={iconStyles.root} />,
                headerLeft: () => <ProductDetailsHeaderLeft />,
                headerRight: () => <MainHeaderRight />,
              }}
            />
            <Drawer.Screen name={DrawerRoutes.Trash} component={TrashScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AuthenticationContext.Provider>
    </ApiClientContext.Provider>
  );
};

export default gestureHandlerRootHOC(App);

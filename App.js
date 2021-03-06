import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from '@react-native-firebase/app';
import ReduxThunk from 'redux-thunk';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EmployeeeList from './src/components/EmployeeeList';
import EmployeeCreate from './src/components/EmployeeCreate';
import EmployeeEdit from './src/components/EmployeeEdit';
import reducers from './src/reducers';
import LoginForm from './src/components/LoginForm';
import {navigationRef} from './src/navigationRef';

const Stack = createStackNavigator();
class App extends Component {
  componentDidMount() {
    // TODO: add coresponding authentication details here
    //to get this --> select project from firebase-->project settings-->firebase sdk snippet-->config(copy fro there)
    const firebaseConfig = {
      apiKey: '******',
      authDomain: '*******',
      databaseURL: '********',
      projectId: '*********',
      storageBucket: '*********',
      messagingSenderId: '********',
      appId: '*********',
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <View style={{flex: 1}}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={LoginForm} />
              <Stack.Screen name="Employee List" component={EmployeeeList} />
              <Stack.Screen name="Employee create" component={EmployeeCreate} />
              <Stack.Screen name="Employee edit" component={EmployeeEdit} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

export default App;

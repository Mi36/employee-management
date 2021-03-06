import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCES,
  EMPLOYEE_SAVE_SUCCESS,
} from './types';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import * as RootNavigation from '../navigationRef';
export const employeeUpdate = ({prop, value}) => {
  console.log(prop, value);
  return {
    type: EMPLOYEE_UPDATE,
    payload: {prop, value},
  };
};

export const employeeCreate = ({name, phone, shift}) => {
  console.log(name, shift, phone);
  const {currentUser} = auth();
  console.log(auth());
  //ithil ninnum namukk response onnum vendathath kond dispatch onnum kodukkathe just return kodukkuka
  //navigate cheyyuka

  return (dispatch) => {
    database()
      .ref(`/users/${currentUser.uid}/employees`)
      .push({name, phone, shift})
      .then(() => {
        dispatch({type: EMPLOYEE_CREATE});
        RootNavigation.navigate('Employee List');
      });
  };
};

export const employeeFetch = () => {
  const {currentUser} = auth();
  return (dispatch) => {
    database()
      .ref(`/users/${currentUser.uid}/employees`)
      .on('value', (snapshot) => {
        dispatch({type: EMPLOYEES_FETCH_SUCCES, payload: snapshot.val()});
      });
  };
};

export const employeeSave = ({name, phone, shift, uid}) => {
  const {currentUser} = auth();
  console.log(name, shift, phone);
  return (dispatch) => {
    database()
      .ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({name: name, phone: phone, shift: shift})
      .then(() => {
        dispatch({type: EMPLOYEE_SAVE_SUCCESS});
        RootNavigation.navigate('Employee List');
      });
  };
};

export const employeeDelete = ({uid}) => {
  const {currentUser} = auth();
  return () => {
    database()
      .ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        RootNavigation.navigate('Employee List');
      });
  };
};

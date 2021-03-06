import {EMPLOYEES_FETCH_SUCCES} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCES:
      return action.payload;
    default:
      return state;
  }
};

import { SET_TOKEN } from '../actions/index';
const initialState = {
  token: null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
      });
    default:
      return state;
  }
};

export default tokenReducer;

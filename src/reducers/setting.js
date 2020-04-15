import { SET_LOGGEDIN, SET_USERNAME } from "../actions/index";

const initialState = {
  userinfo: null,
  inLogin: false
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      // TODO
      return Object.assign({}, state, {
        currentUser: {
          username: action.username
        }
      })
    case SET_LOGGEDIN:
      // TODO
      return Object.assign({}, state, {
        inLogin: action.isLogin
      })
    default:
      return state;
  }
};

export default settingReducer;

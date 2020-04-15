export const SET_LOGGEDIN = "SET_LOGGEDIN";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USERNAME = "SET_USERNAME";

export const setLoggedIn = isLogin => ({
  type: SET_LOGGEDIN,
  isLogin
});

export const setToken = token => ({
  // TODO
  type: SET_TOKEN,
  token
});

export const setUserName = username => ({
  type: SET_USERNAME,
  username
});

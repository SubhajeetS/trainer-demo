import * as loginService from "../services/auth.service";
import * as meetingService from "../services/meeting.service";

export const login = (email, password) => async (dispatch) => {
  const { user, tokens } = await loginService.login(email, password);
  return dispatch({
    type: "LOGIN_SUCCESS",
    user,
    tokens,
  });
};

export const getSession = () => async (dispatch, getState) => {
  const { auth: { tokens } = {} } = getState(); 
  
  if(!tokens.access) {
    throw new Error('Not logged in');
  }

  console.log(tokens.access.token);
  const session = await meetingService.getSession(tokens.access.token);

  return dispatch({
    type: "GET_SESSION_SUCCESS",
    session
  });
};
const initialState = {
  user: {},
  tokens: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      const { user, tokens } = action;
      return {
        ...state,
        user,
        tokens,
      };
    }
    default:
      return state;
  }
}

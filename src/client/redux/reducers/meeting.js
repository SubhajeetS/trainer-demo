const initialState = {
  session: {},
  participants: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_SESSION_SUCCESS": {
      const { session } = action;
      return {
        ...state,
        session,
      };
    }
    case "ADD_PARTICIPANT": {
      const { connectionId } = action.payload;
      return {
        ...state,
        participants: [...state.participants, participantId],
      };
    }
    case "REMOVE_PARTICIPANT": {
      const { connectionId } = action.payload;
      return {
        ...state,
        participants: state.participants.filter(participant !== connectionId),
      };
    }
    default:
      return state;
  }
}

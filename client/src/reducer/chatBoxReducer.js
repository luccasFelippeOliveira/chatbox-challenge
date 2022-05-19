const chatBoxReducer = (state, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        messageList: [...state.messageList, action.payload],
        userId: action.payload.userId,
        systemTyping: true,
      };
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        messageList: [...state.messageList, action.payload],
        systemTyping: false,
      };
    case "SEND_LIKE":
    case "DELETE_LIKE":
      return {
        ...state,
        messageList: state.messageList.map(message => {
          if (message._id === action.payload._id) {
            return action.payload
          } else {
            return message
          }
        })
      }
    default:
      return state;
  }
};

export default chatBoxReducer;

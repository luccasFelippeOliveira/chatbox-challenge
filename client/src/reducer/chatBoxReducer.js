const chatBoxReducer = (state, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        messageList: [...state.messageList, action.payload],
        systemTyping: true,
      };
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        messageList: [...state.messageList, action.payload],
        systemTyping: false,
      };
    default:
      return state;
  }
};

export default chatBoxReducer;

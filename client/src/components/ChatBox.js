import React, { createContext, useReducer } from "react";
import chatBoxReducer from "../reducer/chatBoxReducer";
import { ChatArea } from "./ChatArea";
import { ChatBoxForm } from "./ChatBoxForm";

// Inital State
const initialState = {
  messageList: [],
  systemTyping: false,
};

export const ChatBoxContext = createContext(initialState);

export const ChatBox = ({ className = "" }) => {
  const [state, dispatch] = useReducer(chatBoxReducer, initialState);

  const sendMessage = (message) => {
    dispatch({
      type: "SEND_MESSAGE",
      payload: message,
    });
  };

  return (
    <div className={`bg-purple-600 p-5 flex flex-col rounded ${className}`}>
      <ChatBoxContext.Provider
        value={{
          messageList: state.messageList,
          systemTyping: state.systemTyping,
          sendMessage,
        }}
      >
        <ChatArea className="grow mb-5" />
        <div className="flex-none">
          <ChatBoxForm />
        </div>
      </ChatBoxContext.Provider>
    </div>
  );
};

import axios from "axios";
import React, { createContext, useReducer } from "react";
import chatBoxReducer from "../reducer/chatBoxReducer";
import { ChatArea } from "./ChatArea";
import { ChatBoxForm } from "./ChatBoxForm";

// Inital State
const initialState = {
  messageList: [],
  userId: null,
  systemTyping: false,
};

export const ChatBoxContext = createContext(initialState);

export const ChatBox = ({ className = "" }) => {
  const [state, dispatch] = useReducer(chatBoxReducer, initialState);

  const sendMessage = async (message) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const body = {
        ...message,
        userId: state.userId,
      }
      const response = await axios.post('/api/v1/chat', body, config);
      dispatch({
        type: 'SEND_MESSAGE',
        payload: response.data.data
      });
    } catch (error) {
      alert(Array.isArray(error.response.data.data) ? error.response.data.data.join(',') : error.response.data.data)
    }
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

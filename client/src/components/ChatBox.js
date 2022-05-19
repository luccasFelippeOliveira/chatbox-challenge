import axios from "axios";
import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import chatBoxReducer from "../reducer/chatBoxReducer";
import { ChatArea } from "./ChatArea";
import { ChatBoxForm } from "./ChatBoxForm";
import io from 'socket.io-client';

// Inital State
const initialState = {
  messageList: [],
  userId: null,
  systemTyping: false,
};

export const ChatBoxContext = createContext(initialState);

export const ChatBox = ({ className = "" }) => {
  const [state, dispatch] = useReducer(chatBoxReducer, initialState);
  const socketRef = useRef(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    console.log('ran useEffect')
    const newSocket = io();
    socketRef.current = newSocket;

    socketRef.current.on('receive_message', receiveMessage);
    socketRef.current.on('receive_user_id', receiveUserId);

    return () => {
      socketRef.current.disconnect();
    }
  }, [])

  const sendMessage = async (message) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const body = {
        ...message,
        userId: userId,
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

  const receiveMessage = async (message) => {
    console.log(message)
  }

  const receiveUserId = (userId) => {
    setUserId(userId);
  }

  return (
    <div className={`bg-purple-600 p-5 flex flex-col rounded ${className}`}>
      <ChatBoxContext.Provider
        value={{
          messageList: state.messageList,
          systemTyping: state.systemTyping,
          sendMessage,
          socketRef
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

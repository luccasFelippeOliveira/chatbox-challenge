import React from "react";
import { ChatArea } from './ChatArea';
import { ChatBoxForm } from './ChatBoxForm';

export const ChatBox = ({ className = "" }) => {
  return (
    <div className={`bg-purple-600 p-5 flex flex-col rounded ${className}`}>
      <ChatArea className="grow mb-5" />
      <div className="flex-none">
        <ChatBoxForm />
      </div>
    </div>
  );
};

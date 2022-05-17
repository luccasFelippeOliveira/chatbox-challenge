import React from "react";

export const ChatBubble = ({ type = "user", message = "", className='', children }) => {
  const bubbleColor = type === 'user' ? 'bg-red-300' : 'bg-sky-300'
  return (
    <div className={`break-words ${bubbleColor} rounded-xl p-2 mb-2 ml-2 ${className}`}>
      {children}
    </div>
  );
};

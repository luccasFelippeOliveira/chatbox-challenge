import React, { useContext, useEffect, useRef } from "react";
import { ChatBoxContext } from "./ChatBox";
import { ChatBubble } from "./ChatBubble";

export const ChatArea = ({ className = "" }) => {
  const { messageList, systemTyping } = useContext(ChatBoxContext);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
  }, [messageList])

  return (
    <div ref={scrollAreaRef} className={`bg-emerald-50 rounded overflow-y-scroll ${className}`}>
      {messageList.map((message, index) => {
        return (
          <div className="w-100 mt-2" key={index}>
            <ChatBubble
              className={`w-1/2 ${
                message.type === "user" ? "float-right" : "float-left"
              }`}
              type={message.type}
              messageId={message._id}
              thumbsUp={message.like}
            >
              {message.message}
            </ChatBubble>
          </div>
        );
      })}
      {systemTyping ? (
        <div className="w-100">
          <ChatBubble className="w-1/2 float-left" type="system">
            <div className="mx-auto text-center">
              <span className="inline-block w-2 h-2 rounded-full bg-slate-700 mr-1 animate-wave"></span>
              <span className="inline-block w-2 h-2 rounded-full bg-slate-700 mr-1 animate-wave animate-delay-1100"></span>
              <span className="inline-block w-2 h-2 rounded-full bg-slate-700 mr-1 animate-wave animate-delay-900"></span>
            </div>
          </ChatBubble>
        </div>
      ) : null}
    </div>
  );
};

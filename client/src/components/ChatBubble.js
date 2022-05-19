import React, { useContext, useState } from "react";
import thumbsUpIcon from "../icons/thumbs-up.svg";
import { ChatBoxContext } from "./ChatBox";

export const ChatBubble = ({
  type = "user",
  messageId = "",
  className = "",
  thumbsUp = false,
  children,
}) => {
  const {likeMessage, dislikeMessage} = useContext(ChatBoxContext);

  const thumbsClipUp = () => {
    if (thumbsUp === true) {
      dislikeMessage(messageId)
    } else {
      likeMessage(messageId)
    }
  };

  const bubbleColor = type === "user" ? "bg-red-300" : "bg-sky-300";
  return (
    <div
      className={`break-words ${bubbleColor} rounded-xl p-2 mb-2 ml-2 ${className}`}
    >
      {children}
      {type === "system" ? (
        <div className="w-100">
          <button
            onClick={() => thumbsClipUp()}
            className={`bottom-0 right-0 w-8 h-8 rounded-full ${thumbsUp ? "bg-amber-400" : "bg-amber-200"} text-center align-middle float-right text-slate-50 ml-2`}
          >
            <img
              src={thumbsUpIcon}
              className="max-h-5 m-auto inline-block align-sub"
              alt="thumbs up button"
            />
          </button>
        </div>
      ) : null}
    </div>
  );
};

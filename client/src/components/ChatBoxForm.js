import React from "react";
import sendIcon from '../icons/corner-down-right.svg';

export const ChatBoxForm = () => {
  return (
    <div className="flex-row flex h-12">
      <input className="flex-1 min-w-0 h-10 mr-2 ring-1 ring-black rounded-xl pl-2"></input>
      <button className="w-10 h-10 p-2 bg-lime-300 border-b-4 border-lime-700 active:border-b-0 text-white flex-initial rounded-full">
        <img src={sendIcon} className="mx-auto h-5" alt="send" />
      </button>
    </div>
  );
};

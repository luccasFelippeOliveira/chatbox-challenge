import React, { useContext, useState } from "react";
import sendIcon from "../icons/corner-down-right.svg";
import { ChatBoxContext } from "./ChatBox";

export const ChatBoxForm = () => {
  const [textValue, setTextValue] = useState("");
  const { sendMessage } = useContext(ChatBoxContext);

  const onTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newText = {
      message: textValue,
      type: "user",
    };

    setTextValue("");

    sendMessage(newText);
  };

  return (
    <form className="flex-row flex h-12" onSubmit={onSubmit}>
      <input
        className="flex-1 min-w-0 h-10 mr-2 ring-1 ring-black rounded-xl pl-2"
        value={textValue}
        onChange={onTextChange}
      ></input>
      <button
        type="submit"
        className="w-10 h-10 p-2 bg-lime-300 border-b-4 border-lime-700 active:border-b-0 text-white flex-initial rounded-full"
      >
        <img src={sendIcon} className="mx-auto h-5" alt="send" />
      </button>
    </form>
  );
};

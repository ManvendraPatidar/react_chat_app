import React, { useContext, useEffect, useState } from "react";
import "./InputSection.css";
import { MyContext, socket } from "../../screens/HomePage/HomePage";
import { checkIsRoom } from "../../sevices/checkIsRoom";

function InputSection() {
  const { userData, currentChat, setCurrentChat } = useContext(MyContext);
  const [message, setMessage] = useState("");
  const [isRoom, setIsRoom] = useState(false);

  useEffect(() => {
    setIsRoom(checkIsRoom(currentChat.id ?? ""));
  }, [currentChat.id]);

  return (
    <div id="inputsection">
      <input
        disabled={currentChat.id ? false : true}
        className="inputTextFeild"
        placeholder="Send a message"
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            isRoom ? sendRooomMessage() : sendMessage();
          }
        }}
      />
      <img
        onClick={isRoom ? sendRooomMessage : sendMessage}
        style={{
          height: 35,
          backgroundColor: "white",
          width: 35,
          borderRadius: 35,
          margin: "10px",
        }}
        src="https://t3.ftcdn.net/jpg/02/93/72/48/360_F_293724835_LqDz77Sl5zGWOU5eEcPYMM99qeBiiaiu.jpg"
      ></img>
    </div>
  );

  function sendMessage() {
    if (message.trim() != "") {
      socket.emit("sendDirectMessage", {
        senderId: userData?.userId,
        receiverId: currentChat.id,
        content: message,
      });
    }
    setMessage("");
  }

  function sendRooomMessage() {
    if (message.trim() != "") {
      if (socket.connected) {
        socket.emit("sendRoomMessage", {
          senderId: userData?.userId,
          roomId: currentChat?.id,
          content: message,
        });
      }
    }
    setMessage("");
  }
}

export default InputSection;

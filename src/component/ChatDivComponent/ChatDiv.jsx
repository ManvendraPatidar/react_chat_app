import React, { useContext, useEffect, useRef, useState } from "react";
import "./ChatDiv.css";
import { BASEURL, MyContext, socket } from "../../screens/HomePage/HomePage";
import ChatTile from "../ChatTileComponent/ChatTile";
import axios from "axios";
import { checkIsRoom } from "../../sevices/checkIsRoom";

function ChatDiv() {
  const { userData, currentChat, setCurrentChat } = useContext(MyContext);

  const [message, setMessage] = useState([]);
  const chatEndRef = useRef(null);

  socket.on("newDirectMessage", (res) => {
    if (res.receiverId == currentChat.id || res.senderId == currentChat.id) {
      const newArray = [...message, res];
      setMessage(newArray);
    }
  });

  socket.on("newRoomMessage", (res) => {
    if (res.roomId == currentChat.id) {
      const newArray = [...message, res];

      setMessage(newArray);
    }
  });

  useEffect(() => {
    socket.emit("registerSocket", { userId: userData?.userId });
    socket.emit("reJoinRoom", {
      userId: userData?.id,
      roomId: currentChat?.id,
    });

    setMessage([]);

    fetchMessageHistory();
  }, [currentChat]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div
      className="chatDiv"
      style={{ justifyContent: message.length > 0 ? "flex-start" : "center" }}
    >
      {currentChat.id ? (
        message.length > 0 ? (
          message.map((data, index) => {
            return <ChatTile key={index} data={data} />;
          })
        ) : false ? (
          <span>
            {" "}
            Everyone in {currentChat.name} group is waiting for your message{" "}
          </span>
        ) : (
          <span>
            {" "}
            your friend {currentChat.name} is waiting for your message{" "}
          </span>
        )
      ) : (
        <span>
          Select person from left menu and start conversation with them.{" "}
        </span>
      )}

      <div ref={chatEndRef} />
    </div>
  );

  function fetchMessageHistory() {
    const isRoom = checkIsRoom(currentChat.id ?? "");

    const data = isRoom
      ? {
          senderId: userData.userId,
          receiverId: "",
          roomId: currentChat.id,
        }
      : {
          senderId: userData.userId,
          receiverId: currentChat.id,
          roomId: "",
        };

    axios
      .post(BASEURL + "/getPreviousMessages", data)
      .then((res) => {
        if (res.status === 200) {
          setMessage(res.data.messages);
        }
      })
      .catch((err) => {
        console.log("errror -----> ", err);
      });
  }
}

export default ChatDiv;

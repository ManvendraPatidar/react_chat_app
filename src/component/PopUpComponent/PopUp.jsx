import React, { useContext, useEffect, useState } from "react";
import "./popUp.css";
import "../LoginModel/LoginModel.css";
import { MyContext, socket } from "../../screens/HomePage/HomePage";
import "../FriendListSection/FriendListSection.css";

function PopUp({ Component, setShowPopUp }) {
  const { currentChat, userData } = useContext(MyContext);
  const [isJoinRoom, setIsJoinRoom] = useState();
  const [roomName, setRoomName] = useState("");
  return (
    <div
      className="popUpStyle"
      onClick={() => {
        setShowPopUp(false);
      }}
    >
      {Component}
    </div>
  );
}

export default PopUp;

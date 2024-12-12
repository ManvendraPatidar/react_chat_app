import React, { useContext, useEffect, useState } from "react";
import "./headerComponent.css";
import ProfileCircle from "../ProfileCircle/ProfileCircle.jsx";
import { MyContext } from "../../screens/HomePage/HomePage.jsx";
import { checkIsRoom } from "../../sevices/checkIsRoom.js";

function HeaderComponent() {
  const [members, setMembers] = useState([]);
  const {
    setShowPopUp,
    setShowJoinRoomPopUp,
    setShowCreateRoomPopUp,
    currentChat,
  } = useContext(MyContext);
  const [isRoom, setIsRoom] = useState(false);
  useEffect(() => {
    setIsRoom(checkIsRoom(currentChat.id ?? ""));
  }, [currentChat.id]);

  return (
    <div className="headerComponent">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          className="menuIconStyle"
          src="https://static.thenounproject.com/png/331097-200.png"
          style={{
            height: "35px",
            width: "35px",
            margin: "0px 10px",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
          onClick={() => {}}
        />

        {isRoom ? (
          <button
            className="createGroupButton"
            onClick={() => {
              setShowJoinRoomPopUp(true);
            }}
          >
            Add Friends{" "}
          </button>
        ) : (
          <></>
        )}
      </div>
      <span className="appName">{currentChat?.name}</span>

      <ProfileCircle />
    </div>
  );
}

export default HeaderComponent;

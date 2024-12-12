import React, { useContext, useEffect, useState } from "react";
import "./JoinRoomPopUp.css";
import { MyContext, socket } from "../../screens/HomePage/HomePage";
import { fetchFriendList } from "../../sevices/API_SERVICES";
import JoinRoomFriendTile from "../../component/JoinRoomFriendTile/JoinRoomFriendTile";
const JoinRoomPopUp = () => {
  const { setShowJoinRoomPopUp, userData, currentChat } = useContext(MyContext);
  const [members, setMembers] = useState([]);
  const selectedMembers = new Set([]);

  useEffect(() => {
    fetchFriendList()
      .then((res) => {
        setMembers(res);
      })
      .catch((e) => {
        console.log("ERRORRR-----");
      });
  }, []);

  return (
    <div>
      <div
        className="containerBox"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span style={{ fontSize: "25px" }}>{currentChat.name}</span>

        <div className="inviteFriendListStyle">
          {members.map((data, index) => (
            <JoinRoomFriendTile
              key={index}
              data={data}
              selectedMembers={selectedMembers}
            />
          ))}
        </div>

        <button
          className="button"
          style={{ margin: "10px 0px 20px 0px" }}
          onClick={() => {
            const selectedList = [...selectedMembers];

            socket.emit("inviteToRoom", {
              roomId: currentChat?.id,
              users: selectedList,
            });

            setShowJoinRoomPopUp(false);
          }}
        >
          Add Friends
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPopUp;

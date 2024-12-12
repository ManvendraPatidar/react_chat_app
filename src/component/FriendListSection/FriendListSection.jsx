import React, { useContext, useEffect, useState } from "react";
import "./FriendListSection.css";
import { MyContext } from "../../screens/HomePage/HomePage";
function FriendListSection({ tittle, list, isRoom }) {
  const [members, setMembers] = useState([]);
  const { setCurrentChat } = useContext(MyContext);

  useEffect(() => {
    setMembers(list);
  });

  return (
    <div>
      <span className="headingText">{tittle}</span>
      <div className="friendListStyle">
        {members.map((i, index) => {
          return (
            <div
              key={index}
              className="friendCardStyle"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
              }}
              onClick={() => {
                updateCurrentList(i);
              }}
            >
              <span style={{ color: "#ff9800", fontSize: "20px" }}>
                {i.name}
              </span>

              {tittle != "Groups" ? (
                <span
                  style={{
                    fontSize: "14px",
                    color: "black",
                    letterSpacing: "1px",
                    fontWeight: "normal",
                  }}
                >
                  {i.email}
                </span>
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  function updateCurrentList(i) {
    setCurrentChat({ id: isRoom ? i.roomId : i.userId, name: i.name });
    localStorage.setItem(
      "currentChat",
      JSON.stringify({ id: isRoom ? i.roomId : i.userId, name: i.name })
    );
  }
}

export default FriendListSection;

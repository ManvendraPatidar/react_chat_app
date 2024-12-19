import React, { useContext } from "react";
import "./ChatTile.css";
import { MyContext } from "../../screens/HomePage/HomePage";

function ChatTile(props) {
  const { userData } = useContext(MyContext);
  const { id, data } = props;

  const iscurrentUSer = data?.senderId === userData?.userId;

  return (
    <div
      className="chatSpace"
      style={{ justifyContent: !iscurrentUSer ? "flex-start" : "flex-end" }}
    >
      <div
        id={id}
        className="chatTile"
        style={{
          borderRadius: !iscurrentUSer
            ? "0px 20px 20px 20px"
            : "20px 0px 20px 20px",
        }}
      >
        <p style={{ fontSize: "12px", color: "aqua" }}>
          {data.senderId.split("-")[0]}
        </p>
        <span>{data.content}</span>
      </div>
    </div>
  );
}

export default ChatTile;

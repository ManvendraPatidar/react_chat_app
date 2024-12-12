import React, { useContext, useEffect, useState } from "react";
import "./ProfileCircle.css";
import "../headerComponent/HeaderComponent.css";
import { MyContext } from "../../screens/HomePage/HomePage";
function ProfileCircle() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [username, setUsername] = useState("XXX");
  const { userData, setUserData, setCurrentChat } = useContext(MyContext);

  useEffect(() => {
    if (userData) {
      const text = userData?.name.toUpperCase();
      setUsername(text);
    }
  }, [userData]);

  return (
    <div
      style={{
        flexDirection: "row",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        border: "1px solid white",
        borderRadius: "50px",
      }}
      onMouseEnter={() => setIsDropdownVisible(true)}
      onMouseLeave={() => setIsDropdownVisible(false)}
    >
      <div className="profileCircle">
        <span className="appName">{username[0]}</span>
      </div>

      {isDropdownVisible ? (
        <div className="logoutModel">
          <span style={{ color: "black", fontSize: "20px", fontWeight: 700 }}>
            {username}
          </span>
          <div
            style={{
              width: "100%",
              margin: "20px 0px",
              height: "1px",
              backgroundColor: "#BABABA",
            }}
          ></div>

          <div
            style={{ fontSize: "20px" }}
            onClick={() => {
              setUserData(null);
              localStorage.clear();
            }}
          >
            Logout
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default ProfileCircle;

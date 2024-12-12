import { useContext, useState } from "react";
import "./LoginModel.css";
import { BASEURL, MyContext } from "../../screens/HomePage/HomePage";
import "../headerComponent/HeaderComponent.css";
import axios from "axios";
function LoginModel({ setShowLoginModel }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const { setUserData, setCurrentChat } = useContext(MyContext);

  return (
    <div className="loginModel">
      <span className="appName">SIGNAL</span>
      <div className="LoginCard">
        <span className="name"> {isLogin ? "Log In" : "Sign Up"}</span>
        <input
          placeholder="Email Address"
          className="inputClass"
          type="email"
          value={email}
          onChange={(n) => {
            setEmail(n.target.value);
          }}
        />

        {isLogin ? (
          <div />
        ) : (
          <input
            placeholder="Enter you Name"
            className="inputClass"
            value={name}
            onChange={(n) => {
              setName(n.target.value);
            }}
          />
        )}
        <input
          placeholder="Password"
          type={"password"}
          className="inputClass"
          value={password}
          onChange={(n) => {
            setPassword(n.target.value);
          }}
        ></input>

        <button
          className="button"
          style={{ margin: "10px 0px 20px 0px" }}
          onClick={isLogin ? onLogin : onSignUp}
        >
          {isLogin ? "Start Chat" : "Create Account"}
        </button>

        <span
          className="signupButton"
          onClick={() => {
            setEmail("");
            setPassword("");
            setName("");
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? "Create new Account" : "Already have an Account"}
        </span>
      </div>
    </div>
  );

  function onLogin() {
    if (password.trim() == "") {
      alert("Password must not be empty !!");
      return;
    }

    if (isValidEmail(email)) {
      const data = {
        email: email,
        password: password,
      };
      axios
        .post(BASEURL + "/loginUser", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const responseData = JSON.stringify(res.data);
            localStorage.setItem("userData", responseData);

            setUserData(res.data);
            setCurrentChat({});
            setShowLoginModel(false);
            setEmail("");
            setPassword("");
            setName("");
          }
        })
        .catch((err) => {
          console.log("Error --- >", err.status);
          if (err.status === 401) {
            alert("Incorrect Email or Password");
          }
        });
    } else {
      alert("Something went wrong... try again later ");
    }
  }

  function onSignUp() {
    if (password.trim() == "") {
      alert("Password must not be empty !!");
      return;
    }

    if (name.trim() == "") {
      alert("Name must not be empty !!");
      return;
    }

    if (isValidEmail(email)) {
      const data = {
        name: name,
        email: email,
        password: password,
      };

      axios
        .post(BASEURL + "/registerUser", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setEmail("");
            setPassword("");
            setName("");

            setIsLogin(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Seem's like unstable Network try again later.....");
        });
    } else {
      alert("Please Enter a valid email");
    }
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default LoginModel;

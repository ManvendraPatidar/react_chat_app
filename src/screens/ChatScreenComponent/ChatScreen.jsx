
import "./ChatScreen.css"
import ChatDiv from "../../component/ChatDivComponent/ChatDiv";
import HeaderComponent from "../../component/headerComponent/HeaderComponent";
import InputSection from "../../component/InputSection/InputSection";



function ChatScreen() {

  return (
    <div className="chatContainer">
      <HeaderComponent />
      <ChatDiv />
      <InputSection />
    </div>
  );
}

export default ChatScreen;

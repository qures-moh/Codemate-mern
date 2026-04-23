import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "./utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { id } = useParams();

  const user = useSelector((store) => store.user);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = user?._id;
  console.log("This is a", userId);
  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();

    socket.emit("joinChat", { firstName: user.firstName, userId, id });
    socket.on("messageRecieved", ({ firstName, text }) => {
      console.log(firstName, +" " + text);
      setMessage((message) => [...message, { firstName, text }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId]);
  const sentMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      id,
      text: newMessage,
    });
    
  };
  return (
    <div className="flex flex-col items-center mt-2">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="  md:w-1/2 sm:w-3/4 border border-amber-300 h-[500px] ">
           {/* Chat Area */}
        <div className="w-full h-[450px] border-b-2 overflow-y-auto p-2">
          {message.map((msg, index) => (
            <div key={index} className="chat chat-start mb-2">
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50 ml-2">Now</time>
              </div>

              <div className="chat-bubble">{msg.text}</div>

              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between w-full ">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-500 text-white rounded p-2"
            placeholder="Enter Chat"
          />
          <button className="btn-primary" onClick={sentMessage}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;

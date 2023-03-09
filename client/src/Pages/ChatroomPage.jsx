import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const ChatroomPage = ({ socket }) => {
  const params = useParams();
  const chatroomId = params.id;
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });

      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
  });

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom</div>
        <div className="chatroomContent">
          {messages.map((message, index) => (
            <div
              key={chatroomId + message.message + message.name + index}
              className="message"
            >
              <span className="otherMessage">{message.name}: </span>
              {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say Something"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatroomPage;

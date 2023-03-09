import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import makeToast from "../Toaster";

const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = useState([]);
  const chatroomRef = useRef();

  const getChatrooms = () => {
    axios
      .get("http://localhost:5001/chatroomGet", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  const createChatroom = () => {
    const chatroomData = chatroomRef.current.value;

    axios
      .post("http://localhost:5001/chatroom", {
        name: chatroomData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        makeToast("success", response.data.msg);
        getChatrooms();
        chatroomRef.current.value = "";
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeToast("error", err.response.data.message);
      });
  };

  useEffect(() => {
    getChatrooms();
  }, []);

  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="Your Chatroom Name"
            ref={chatroomRef}
          />
        </div>

        <button onClick={createChatroom}>Create Chatroom</button>
        <div className="chatrooms">
          {chatrooms.map((chatroom) => (
            <div key={chatroom._id} className="chatroom">
              <div>{chatroom.name}</div>
              <Link to={"/chatroom/" + chatroom._id}>
                <div className="join">Join</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

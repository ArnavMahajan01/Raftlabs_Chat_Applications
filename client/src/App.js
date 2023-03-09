import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import RegisterPage from "./Pages/RegisterPage";
import IndexPage from "./Pages/indexPage";
import ChatroomPage from "./Pages/ChatroomPage";
import makeToast from "./Toaster";

function App() {
  const [socket, setSocket] = useState(null);

  const socketSetup = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:5001", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(socketSetup, 3000);
        makeToast("error", "Disconnected from chatroom");
      });

      newSocket.on("connection", () => {
        makeToast("success", "Connected to chatroom");
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    socketSetup();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} exact></Route>
        <Route
          path="/login"
          element={<LoginPage setupSocket={socketSetup} />}
          exact
        ></Route>
        <Route path="/register" element={<RegisterPage />} exact></Route>
        <Route
          path="/dashboard"
          element={<DashboardPage socket={socket} />}
          exact
        ></Route>
        <Route
          path="/chatroom/:id"
          element={<ChatroomPage socket={socket} />}
          exact
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

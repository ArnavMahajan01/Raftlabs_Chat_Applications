import React, { useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (!token) {
      redirect("/login");
    } else {
      redirect("/dashboard");
    }
    //eslint-diasable-next-line
  }, [navigate]);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default IndexPage;

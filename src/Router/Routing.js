import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

const Routing = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};

export default Routing;

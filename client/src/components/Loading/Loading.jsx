import React from "react";
import "./Loading.css";

import gif from '../../loading/8ebe2a4ffd8621a04b333b9f4bc306be.gif'

const Loading = () => {
  return (
    <div className="div">
      {/* <div className="preloader"></div> */}
      <img src={gif} alt='gif'></img>
    </div>
  );
};

export default Loading;
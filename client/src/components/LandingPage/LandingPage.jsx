import React from "react";
import { Link } from "react-router-dom";

import '../LandingPage/LandingPage.css';
import video from "../../video.mp4";

export default function LandigPage() {
  return (
    <div className="fondo">
      <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            heigth: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      <h1 className="titul">Welcome to The Delicious Recipes</h1>
      <Link to="/home" >
        <button className="boton"><strong>Explore</strong></button>
      </Link>
    </div>
  );
}

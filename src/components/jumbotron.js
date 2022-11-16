import React from "react";
import JumbotronTitle from "../atoms/jumbotron";
import NavBar from "./navbar";
import PhotoBar from "../assets/index-photobar.png";

function Jumbotron() {
  return (
    <div className="banner" style={{ backgroundImage: `url(${PhotoBar})` }}>
      <NavBar />
      <JumbotronTitle />
    </div>
  );
}

export default Jumbotron;

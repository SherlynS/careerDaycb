import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import { Link } from "react-router-dom";
import RoadmapCardTemplate from "../components/RoadmapCardTemplate";
import softwareEngineerRoadmap from "../data/AIroadmap"; // Import the roadmap data

function Roadmap(props) {
  return (
    <>
      <header style={{ backgroundColor: "#E3DAFF", padding: "20px", textAlign: "center" }}>
        <h1>Roadmap</h1>
      </header>
      {softwareEngineerRoadmap.map((occupation, index) => (
        <RoadmapCardTemplate occupation={occupation} index={index} key={index} />
      ))}
    </>
  );
}

export default Roadmap;


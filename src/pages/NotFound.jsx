import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <h1>404 — Page Not Found</h1>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;

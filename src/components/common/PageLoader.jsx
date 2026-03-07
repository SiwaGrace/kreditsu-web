import React from "react";
import Spinner from "./Spinner";

const PageLoader = () => {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <Spinner />
      <span>Loading...</span>
    </div>
  );
};

export default PageLoader;

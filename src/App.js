import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    //CLEANUP function

    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, [resourceType]);

  return (
    <React.Fragment>
      <div className="displayWidth">Width of screen:{windowWidth}</div>

      <div className="wrapper">
        <div className="btn-div">
          <button onClick={() => setResourceType("posts")}>Posts</button>
          <button onClick={() => setResourceType("users")}>Users</button>
          <button onClick={() => setResourceType("comments")}>Comments</button>
        </div>
      </div>
      <h1>{resourceType}</h1>
      <div className="data">
        {items.map((item) => {
          return <p>{JSON.stringify(item)}</p>;
        })}
      </div>
    </React.Fragment>
  );
}

export default App;

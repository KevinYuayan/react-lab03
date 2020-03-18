import CreateArticle from "./CreateArticle";
import StudentCourse from "./StudentCourse";
import React, { useState } from "react";
//
import axios from "axios";
//
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [article, setArticle] = useState("");
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get("/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const getData = async () => {
    try {
      const res = await axios.get("/welcome");
      console.get("res.data");
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getDataCourse = async () => {
    try {
      const res = await axios.get("/userBycourse");
      console.log("data at course");
      console.log(res.articles);
      setArticle("w");
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  //
  const createArticle = () => {
    console.log("in createArticle");
    setArticle("y");
  };
  //
  if (article === "y") {
    return (
      <div className="App">
        <CreateArticle screen={screen} setScreen={setScreen} />
        {/* <ListCourse screen={screen} setScreen={setScreen} /> */}
      </div>
    );
  } else if (article === "w") {
    return (
      <div className="App">
        <StudentCourse screen={screen} setScreen={setScreen} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <div>
          <p>{screen}</p>
          <p>{data}</p>
          <button onClick={getData}>Get Data</button>
          <button onClick={createArticle}>Create Article</button>
          <button onClick={deleteCookie}>Log out</button>
          <button onClick={getDataCourse}>Get Course</button>
        </div>
      </div>
    );
  }
}

//
export default View;

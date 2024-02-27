import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import "./App.css";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { AuthContext, FirebaseContext } from "./store/FirebaseContext";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./store/PostContext";
import { getAuth } from "firebase/auth";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(firebase);
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user);
    });
    return unsubscribe;
   /* firebase.auth().onAuthStateChanged((user: string) => {
      setUser(user);
    });*/
  },[firebase,setUser]);

  return (
    <div>
      <Post>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />
        </Routes>
      </Post>
    </div>
  );
}

export default App;

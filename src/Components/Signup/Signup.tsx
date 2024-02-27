import React, { useState, useContext, useEffect, useRef } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number | "">("");
  const [password, setPassword] = useState<any>("");
  const { firebase } = useContext(FirebaseContext) ?? {};

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<any>("");

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleNameBlur = () => {
    if (username.length < 5 && username !== "") {
      setNameError("username should contain 5 character");
    } else {
      setNameError("");
      if (username && emailRef.current) {
        emailRef.current.focus();
      }
    }
  };

  const handleEmailBlur = () => {
    if (!email.includes("@") && email !== "") {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
      if (email && phoneRef.current) {
        phoneRef.current.focus();
      }
    }
  };

  const handlePhoneBlur = () => {
    const reg = /^[0-9]+$/;
    if (!phone.toString().match(reg)) {
      setPhoneError("Phone must contain only numbers");
    } else if (phone.toString().length < 10) {
      setPhoneError("Phone number must be at least 10 digits");
    } else {
      setPhoneError("");
      if (phone && passwordRef.current) {
        passwordRef.current.focus();
      }
    }
  };

  const handlePswdBlur = () => {
    if (password.length < 6) {
      setPasswordError("Minimum length of password is 6");
    } else {
        setPasswordError('');
    }
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPhone(isNaN(value) ? "" : value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if(username ===''){
      setNameError('Field is empty')
      return;
    }
     
    if (username.length < 5 && username !== "") {
      setNameError("username should contain 5 character");
      return;
    }

  
    if(email === ''){
      setEmailError('Field is empty')
      return;
    }

    if (!email.includes("@") && email !== "") {
      setEmailError("Invalid email format");
      return;
    } 

    if(phone === ''){
      setPhoneError('Field is empty')
      return;
    }

    const reg = /^[0-9]+$/;
    if (!phone.toString().match(reg)) {
      setPhoneError("Phone must contain only numbers");
      return;
    }
     if (phone.toString().length < 10) {
      setPhoneError("Phone number must be at least 10 digits");
      return;
    } 

    if(password === ''){
      setPasswordError('Field is empty');
      return;
    }

    if (password.length < 6) {
      setPasswordError("Minimum length of password is 6");
      return;
    }


    try {
      const auth = getAuth(firebase);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      const firestore = getFirestore(firebase);
      const usersCollection = collection(firestore, "users");

      await addDoc(usersCollection, {
        id: user.uid,
        username: username,
        phone: phone,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <NavLink to="/">
          <img width="200px" height="200px" src={Logo}></img>
        </NavLink>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            ref={usernameRef}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleNameBlur}
            id="fname"
            name="name"
            defaultValue=""
          />
          {nameError && <div style={{ color: "red" }}>{nameError}</div>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            id="fname"
            name="email"
            defaultValue=""
          />
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            ref={phoneRef}
            value={phone}
            onChange={handlePhone}
            onBlur={handlePhoneBlur}
            id="lname"
            name="phone"
            defaultValue=""
          />
          {phoneError && <div style={{color:'red'}}>{phoneError}</div>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePswdBlur}
            id="lname"
            name="password"
            defaultValue=""
          />
          {passwordError && <div style={{color:'red'}}>{passwordError}</div>}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <NavLink style={{ textDecoration: "none", color: "black" }} to="/login">
          <a>Login</a>
        </NavLink>
      </div>
    </div>
  );
}

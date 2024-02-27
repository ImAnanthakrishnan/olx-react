import React, { useState ,useContext,useRef, useEffect} from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail] = useState<string | ''>('');
  const [password,setPassword] = useState<any>('');
  const {firebase} = useContext(FirebaseContext);
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<any>("");
  useEffect(()=>{
    emailRef.current?.focus();
  },[])

  const handleEmailBlur = () => {
    if (!email.includes("@") && email !== "") {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
      if (email && passwordRef.current) {
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


  const handleLogin = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(email === ''){
      setEmailError('Field is empty')
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
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error:any) {
      alert(error.message);
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
      <NavLink to='/'><img width="200px" height="200px" src={Logo}></img></NavLink>  
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input 
            className="input"
            type="email"
            ref={emailRef}
            onBlur={handleEmailBlur}
            id="fname"
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue=""
          />
          <br />
          {emailError && <div style={{color:'red'}}>{emailError}</div>}
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            ref={passwordRef}
            onBlur={handlePswdBlur}
            id="lname"
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue=""
          />
          <br />
          {passwordError && <div style={{color:'red'}}>{passwordError}</div>}
          <br />
          <button>Login</button>
        </form>
       <NavLink style={{textDecoration:'none',color:'black'}} to='/signup'><a>Signup</a></NavLink> 
      </div>
    </div>
  );
}

export default Login;

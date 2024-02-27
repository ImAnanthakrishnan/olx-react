import React,{useContext,useState,useEffect,} from 'react';

import './Header.css';
import OlxLogo from '../../assests/OlxLogo';
import Search from '../../assests/Search';
import Arrow from '../../assests/Arrow';
import SellButton from '../../assests/SellButton';
import SellButtonPlus from '../../assests/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { PostContext } from "../../store/PostContext";
interface Product {
  id:string;
  name: string;
  category: string;
  price: number;
  url:string;
  userId:string;
  // Add other properties as needed
}

function Header() {
  const {user} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  //const [searchQuery, setSearchQuery] = useState<'' | string>('');
  //const [searchResults, setSearchResults] = useState<[] | Product[]>([]);
  const navigate = useNavigate();

  const warnMsg = () =>{
    alert('Please login')
  }

  /*useEffect(() => {
    console.log(searchQuery);
    console.log(searchResults);
    async function fetchSearchResults() {
      const firestore = getFirestore(firebase);
      const productsRef = collection(firestore, 'products');
      const q = query(productsRef, where('name', '>=', searchQuery));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc:any) => ({ id: doc.id, ...doc.data() }));
      setSearchResults(results);
    }

    fetchSearchResults();
  }, [firebase, searchQuery]);*/

  const handleLogout = async () => {
    try {
      const auth = getAuth(firebase);
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
         <NavLink to='/'><OlxLogo></OlxLogo></NavLink> 
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
           
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>


        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
         <span>{user ? user.displayName :<NavLink style={{textDecoration:'none',color:'black'}} to='/login'>Login</NavLink> }</span>
          <hr />
        </div>
        {user && (
          <span style={{cursor:'pointer'}} onClick={handleLogout}>Logout</span>
        )}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
          {user ? <NavLink style={{color:'black',textDecoration:'none'}} to='/create'><span>SELL</span></NavLink>:<span onClick={warnMsg}>SELL</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

import React, { useEffect,useState,useContext, useId } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore";


function View() {
  const [userDetails,setUserDetails] = useState<any>();
  const {postDetails} = useContext(PostContext);
  const {firebase} = useContext(FirebaseContext);

  const date = new Date(postDetails.createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone:'UTC'
  });

  useEffect(() => {
   
    const fetchUserDetails = async () => {
      try {
        const userId = postDetails.userId;
        const firestore = getFirestore(firebase);
        const q = query(collection(firestore, 'users'), where('id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [firebase, postDetails.userId]);


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{formattedDate}</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div> }
      </div>
    </div>
  );
}
export default View;

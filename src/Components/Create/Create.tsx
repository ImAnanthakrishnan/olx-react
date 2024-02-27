import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';

const Create = () => {

  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);

  const navigate = useNavigate()

  const [name,setName] = useState<string | ''>('');
  const [category,setCategory] = useState<string | ''>('');
  const [price,setPrice] = useState<number | null>(null);
  const [image,setImage] = useState<any | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [nameError, setNameError] = useState<string>("");
  const [catError, setCatError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [imgError, setImgError] = useState<any>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
     // const imageUrl = URL.createObjectURL(file);
      setImage(file);
    } else {
      setImage(null); 
    }
  };
const date = new Date()+"+00:00";
const date1 = new Date(date);

const handleSubmit = async () => {
  try {

    if(name ===''){
      setNameError('Field is empty')
      return;
    }

    if(category === ''){
      setCatError('Field is empty')
      return;
    }

    if(price?.toString() === ''){
      setPriceError('Field is empty')
      return;
    }

    const reg = /^[0-9]+$/;
    if (!price?.toString().match(reg)) {
      setPriceError("Phone must contain only numbers");
      return;
    }

    if(price <= 0){
      setPriceError('only positive value');
      return;
    }

    if(image === ''){
      setImgError('Field is empty');
      return
    }



    const storage = getStorage(firebase);
    const storageRef = ref(storage, `/images/${image?.name}`);
    await uploadBytes(storageRef, image!);
    const url = await getDownloadURL(storageRef);
    const firestore = getFirestore(firebase);
    await addDoc(collection(firestore, 'products'), {
      name,
      category,
      price,
      url,
      userId: user?.uid,
      createdAt: date1.toISOString()
    });
    navigate('/');
  } catch (error) {
    console.error('Error uploading product:', error);
  }
};

useEffect(()=>{
  nameRef.current?.focus();
},[])

  return (
    <Fragment>
      <Header />
      
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              ref={nameRef}
              id="fname"
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue=""
            />
             {nameError && <div style={{ color: "red" }}>{nameError}</div>}
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
          
              id="fname"
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue=""
            />
             {catError && <div style={{ color: "red" }}>{catError}</div>}
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"  onChange={(e) => setPrice(parseInt(e.target.value))} id="fname" name="Price" />
            <br />
            {priceError && <div style={{ color: "red" }}>{priceError}</div>}
          <br />
          <img alt="Posts" width="200px" height="200px"  src={image? URL.createObjectURL(image) : ''}></img>
         
            <br />
            {imgError && <div style={{ color: "red" }}>{imgError}</div>}
            <input onChange={handleImageChange} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      
    </Fragment>
  );
};

export default Create;

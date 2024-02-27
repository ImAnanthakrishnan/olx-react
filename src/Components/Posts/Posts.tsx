import React, { useContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import Heart from "../../assests/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";


interface Product {
  name: string;
  category: string;
  price: number;
  url: any;
  userId: any;
  createdAt: string;
}

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState<[] | Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const firestore = getFirestore(firebase);
        const querySnapshot = await getDocs(collection(firestore, "products"));
        const allPost: Product[] = querySnapshot.docs.map((product: any) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProducts(allPost);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product, index) => {
            const date = new Date(product.createdAt);
            const formattedDate = date.toLocaleString("en-US", {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
              timeZone:'UTC'
            });
            return (
              <div
                key={index}
                className="card"
                onClick={() => {
                  setPostDetails(product);
                  navigate("/view");
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{formattedDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
          <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/pexels-mike-bird-244553.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 150000</p>
              <span className="kilometer">Wheels</span>
              <p className="name"> Allows</p>
            </div>
            <div className="date">
              <span>10/5/2022</span>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/download.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 100000</p>
              <span className="kilometer">cycle</span>
              <p className="name"> Firefox</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;

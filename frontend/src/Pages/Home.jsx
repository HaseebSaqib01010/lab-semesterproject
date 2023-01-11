import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "../axios";
import "./home.css";
function Card({ title, category, imageUrl, date, name, desc }) {
  return (
    <div className="card-body">
      <div className="img-container">
        <img src={imageUrl} alt="" />
      </div>
      <div className="title-date">
        <h2 className="title">{title}</h2>
        <p className="date">Date: {date}</p>
      </div>
      <p className="desc">{desc}</p>
      <h3 className="username">By: {name}</h3>
    </div>
  );
}
function Home() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function fetchReviews() {
      const res = await axios.get("/review");
      // console.log(res);
      setReviews(res.data.reviews);
    }
    fetchReviews();
  }, []);
  return (
    <div className="home">
      <Navbar />
      <div className="cards">
        {reviews.map((item) => (
          <Card
            title={item.title}
            category={item.category}
            date={item.date}
            name={item.user.name}
            imageUrl={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

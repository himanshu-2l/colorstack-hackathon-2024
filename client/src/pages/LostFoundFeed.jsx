import React, { useState, useEffect } from "react";
import axios from "axios";

const LostFoundFeed = () => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    getLostItems();
  }, []);

  const getLostItems = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/reports');
      const lostAndFoundItems = res.data.filter(item => item.typeOfPost === "Lost and found");
      setLostItems(lostAndFoundItems);
    } catch (error) {
      console.log("Error fetching lost and found posts:", error);
    }
  };

  return (
    <div>
      <h1>Lost and Found Feed</h1>
      {lostItems.length === 0 ? (
        <p>No lost items found.</p>
      ) : (
        <ul>
          {lostItems.map(item => (
            <li key={item._id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{maxWidth: '200px'}} />}
              <p>Status: {item.status}</p>
              <p>Posted on: {new Date(item.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LostFoundFeed;

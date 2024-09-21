import React, { useState, useEffect } from "react";
import axios from "axios";

const Problems = () => {
  const [allProblems, setAllProblems] = useState([]);

  useEffect(() => {
    getAllProblems();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const getAllProblems = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/reports');
      const issueItems = res.data.filter(item => item.typeOfPost === "Issue");
      setAllProblems(issueItems);
    } catch (error) {
      console.log("Error fetching Issues posts:", error);
    }
  };

  return (
    <div>
      <h1>Issues</h1>
      {allProblems.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <ul>
          {allProblems.map(item => (
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

export default Problems;

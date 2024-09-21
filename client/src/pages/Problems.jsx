import React, { useState, useEffect } from "react";

const Problems = () => {
  const [allProblems, setAllProblems] = useState("");

  useEffect(() => {
    getAllProblems();
  });

  const getAllProblems = async () => {
    // modifies allProblems state
    return;
  };

  return (
    <div>
      <p>Problems test</p>

      {/* loop through all problems */}
    </div>
  );
};

export default Problems;

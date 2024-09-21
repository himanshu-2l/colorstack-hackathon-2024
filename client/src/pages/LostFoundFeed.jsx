import React, { useState, useEffect } from "react";

const LostFoundFeed = () => {
  const [lostItems, setLostItems] = useState("");

  useEffect(() => {
    getLostItems();
  });

  const getLostItems = async () => {
    // modifies getLostItems state
    return;
  };

  return (
    <div>
      <p>LostFoundFeed test</p>

      {/*  loop through all items */}
    </div>
  );
};

export default LostFoundFeed;

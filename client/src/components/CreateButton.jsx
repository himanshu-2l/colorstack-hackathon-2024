import { useState, useEffect } from "react";

const CreateButton = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [typeOfPost, setTypeOfPost] = useState("Issue");
  //   Other possiblity is "Lost and Found"
  const [imageURL, setImageURL] = useState("");

  // Schema for Reference:
  //   const ReportSchema = new mongoose.Schema({
  //     title: { type: String, required: true },
  //     description: { type: String, required: true },
  //     typeOfPost: {
  //       type: String,
  //       default: "Issue",
  //       enum: ["Issue", "Lost and found"],
  //       required: true,
  //     },
  //     status: {
  //       type: String,
  //       default: "Pending",
  //       enum: ["Pending", "In Progress", "Resolved"],
  //     },
  //     imageUrl: { type: String },
  //     createdAt: { type: Date, default: Date.now },
  //   });

  const submitLostFound = async () => {
    return;
  };

  const submitIssues = async () => {
    return;
  };

  const handleSubmit = () => {
    if (typeOfPost == "Issue") {
      submitLostFound();
    } else {
      submitIssues();
    }
  };

  return (
    <div>
      <p>create button - schema</p>
      <form onSubmit={handleSubmit}>
        <input
          class="bg-slate-200"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          class="bg-slate-200"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateButton;

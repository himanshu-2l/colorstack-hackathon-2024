import { useState, useEffect } from "react";

const CreateButton = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isIssue, setIsIssue] = useState(true);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file selected
    if (file) {
      console.log("File Name:", file.name);
      console.log("File Type:", file.type);
      console.log("File Size:", file.size, "bytes");
    }
  };

  return (
    <div>
      <p>create button - schema</p>
      <form onSubmit={handleSubmit}>
        <input
          class="bg-slate-200"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          class="bg-slate-200"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <input
          type="checkbox"
          class="bg-slate-200"
          checked={isIssue}
          required
          onChange={(e) => setIsIssue(e.target.checked)}
          placeholder="Issue"
        />

        <input
          type="file"
          accept="image/*"
          id="contained-button-file"
          onChange={handleFileChange} // Attach the change event handler
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateButton;

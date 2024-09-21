import { useState } from "react";
import axios from "axios";

const CreateButton = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [typeOfPost, setTypeOfPost] = useState("Issue");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("typeOfPost", typeOfPost);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Report created:", response.data);
      // Reset form after successful submission
      setTitle("");
      setDescription("");
      setTypeOfPost("Issue");
      setImage(null);
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <h2>Create New Report</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter title"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter description"
            rows="4"
          />
        </div>

        <div>
          <label htmlFor="typeOfPost">Type of Post</label>
          <select
            id="typeOfPost"
            value={typeOfPost}
            onChange={(e) => setTypeOfPost(e.target.value)}
          >
            <option value="Issue">Issue</option>
            <option value="Lost and found">Lost and Found</option>
          </select>
        </div>

        <div>
          <label htmlFor="image">Image (optional)</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default CreateButton;

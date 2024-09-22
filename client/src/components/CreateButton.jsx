import { useState } from "react";
import axios from "axios";
import { PiCompassRoseFill } from "react-icons/pi";

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
      const response = await axios.post(
        "http://localhost:3000/api/reports",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
    <div className="w-full">
      <h2 className="text-left ml-4 text-xl pb-2 font-bold">
        Create New Report
      </h2>
      <hr className="pb-2"></hr>
      <form
        onSubmit={handleSubmit}
        className="text-center gap-4 items-start flex flex-col w-full p-4"
      >
        <div className="flex flex-col  items-start content-start">
          <label htmlFor="title" className="font-bold text-sm mb-1">
            Title*
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 w-full border border-2 border-slate-100 outline-none border-black rounded-lg"
            placeholder="Enter title"
          />
        </div>

        <div className="flex flex-col  items-start content-start">
          <label htmlFor="description" className="font-bold text-sm mb-1">
            Description*
          </label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter description"
            className="p-2 border border-2 border-slate-100  outline-none border-black rounded-lg"
            rows="4 "
          />
        </div>

        <div className="flex flex-col  items-start content-start">
          <label htmlFor="typeOfPost" className="font-bold text-sm mb-1">
            Type of Post*
          </label>
          <select
            id="typeOfPost"
            className="border border-2 border-slate-100  outline-none border-black rounded-lg p-2"
            value={typeOfPost}
            onChange={(e) => setTypeOfPost(e.target.value)}
          >
            <option value="Issue">Issue</option>
            <option value="Lost and found">Lost and Found</option>
          </select>
        </div>

        <div className="flex flex-row gap-2 justify-between items-between py-2">
          <label htmlFor="image" className="font-bold">
            Image
          </label>
          <br></br>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="px-4 w-full py-2 bg-sky-200 hover:bg-sky-500 rounded-md text-white font-bold text-sm duration-3 transition ease-in"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default CreateButton;

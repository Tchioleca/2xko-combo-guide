import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProjectPage() {

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ...logic for creating a new Project should be here

    const body = {
      title: title,
      description: description
    }

    console.log(body)

    //* example of how to do POST requests with fetch
    // fetch(`${import.meta.env.VITE_SERVER_URL}/projects`, {
    //   method: "POST",
    //   body: {}
    // })

    axios.post(`${import.meta.env.VITE_SERVER_URL}/projects`, body)
    .then(() => {
      // if we get to this line of code, it means the backend created the document correctly!
      navigate("/projects")
    })
    .catch((error) => {
      console.log(error)
    })

  };  

  return (
    <div className="CreateProjectPage">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}> 
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProjectPage;
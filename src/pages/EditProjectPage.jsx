import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//1. getting the most recent info from the project (useEffect, axios.get)
//2. updating the project with the values of the input. (axios.put)

function EditProjectPage() {

  const navigate = useNavigate()

  const params = useParams()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)
    .then((response) => {
      console.log(response)
      setTitle(response.data.title)
      setDescription(response.data.description)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true)
    // ...updated logic should be here

    const body = {
      title,
      description
    }

    try {
      
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`, body)
      // setIsLoading(false)
      navigate(`/projects/${params.projectId}`)
      // navigate(-1)

    } catch (error) {
      console.log(error)
    }

  };

  const deleteProject = () => {
    // ...delete logic should be here

    axios.delete(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)
    .then(() => {
      navigate("/projects")
    })
    .catch((error) => {
      console.log(error)
    })
    
  }; 

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" disabled={isLoading}>Update Project</button>
      </form>


      <button onClick={deleteProject}>Delete Project</button>      
      <div>Are you sure?
        <button>sure</button>
        <button>NOOO</button>
      </div>
    </div>
  );
}

export default EditProjectPage;

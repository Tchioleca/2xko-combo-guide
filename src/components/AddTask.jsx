
import axios from "axios";
import { useState } from "react";
// import { useParams } from "react-router-dom";

function AddTask(props) {

  // const params = useParams()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...logic for creating a new Task should be here
    // ... the ID of the Project should be part of the Task data

    const body = {
      title: title,
      description: description,
      projectId: props.projectId
    }

    console.log(body)

    try {
      // start the try when the async operation starts
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/tasks`, body)
      
      console.log("Task created!")

      props.getData() // update the project and tasks


    } catch (error) {
      console.log(error)
    }


  };
  
  return (
    <div className="AddTask">
      <h3>Add New Task</h3>
      
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

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
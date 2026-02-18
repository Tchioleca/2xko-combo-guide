import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"; // used to render each Project
import { useEffect, useState } from "react";
import axios from "axios";

// "https://project-management-api.edu.ironhack.com"

function ProjectListPage() {

  const [allProjects, setAllProjects] = useState(null)

  useEffect(() => {
    getData()
  }, [])
  
  const getData = async () => {
    try {
      
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/projects`)
      console.log(response)
      setAllProjects(response.data)

    } catch (error) {
      console.log(error)
    }
  }
  
  if (allProjects === null) {
    return <h3>Loading...</h3>
  }

  return (
    <div className="ProjectListPage">

      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>     

      {/* ... list of all projects should be rendered here   */}
      {/* ... for each project, we should render one ProjectCard */}
      {allProjects.map((eachProject) => {
        return <ProjectCard key={eachProject.id} {...eachProject}/>
      })}
       
    </div>
  );
}

export default ProjectListPage;
import { Link } from "react-router-dom";

function ProjectCard({title, description, id}) {
  
  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
    </div>
  );
}

export default ProjectCard;
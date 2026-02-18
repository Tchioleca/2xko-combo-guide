
function TaskCard({eachTask}) {
    return (
      <div className="TaskCard card">
        <h3>{eachTask.title}</h3>
        <h4>Description:</h4>
        <p>{eachTask.description}</p>
      </div>
    );
  }
  
  export default TaskCard;
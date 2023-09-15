import { Link } from "react-router-dom";

export default function Archive( {archiveTasks, removeArchivedTask, removeAllArchived} ) {


    //need to map through archive tasks to use them??


    return(
        <>
        <h1>Arachive tasks</h1>

        <>
            {archiveTasks.map((todo) => (
        
                <>
                    {todo.title ? 
                    <div key={todo.id}>
                        <h1>{todo.title}</h1>
                        <p>ID: {todo.id}</p>
              
                        <p>task type: {todo.taskType}</p>
                        <p>Due: {todo.due}</p>
                        <button onClick={() => {
                            removeArchivedTask(todo.id);
                        }}>Clear Task</button>
                    </div> 
                    
                    : null }  
                </>
                ))}

                <button onClick={() => {
                    removeAllArchived();
                }}>Remove all completed</button>
            </>

        <Link to='/'>
            <div>go back</div>
        </Link>

        </>
        
    )
}


/* https://open-meteo.com/en/docs#latitude=-37.814&longitude=144.9633&hourly=temperature_2m,rain,cloudcover
*/
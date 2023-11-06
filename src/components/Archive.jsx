import { Link } from "react-router-dom";
import '../Styles/Archive.css';

export default function Archive( {archiveTasks, removeArchivedTask, removeAllArchived} ) {


    //need to map through archive tasks to use them??


    return(
        <div id="archive-body">

            <header>
                <h1>Arachive tasks</h1>
            </header>

            <section>

                <div id="conditional-container"> 
                <div id="flex-container">
                    {archiveTasks.length > 0 ? 
                        <>
                        {/*Below defines the  grid set up for when an archive task exists */}
                            <div class="grid-container">{archiveTasks.map((todo) => (<div> {todo.title ? //generates each archived task
                                    <div class="grid-item"> 
                                        <div key={todo.id}>
                                            <h1>{todo.title}</h1>              
                                            <p>task type: {todo.taskType}</p>
                                            {todo.due ? <p>{todo.due}</p> : null}
                                            <button onClick={() => {removeArchivedTask(todo.id);}}>
                                                Clear Task
                                            </button>
                                        </div>
                                    </div>: null }  
                                </div>
                                    ))}
                            </div>
                        </>
                    
                    : <div id="no-render">
                        <p>no tasks, go grind.</p>
                    </div>}
                </div>
                


                </div>

                    

            </section>

        
            <footer>
                <Link to='/'>
                    <div id="go-home">go back</div>
                </Link>
                <button onClick={() => {
                        removeAllArchived();
                    }}>Remove all completed</button>
            </footer>

        </div>
       
        
    )
}


/* https://open-meteo.com/en/docs#latitude=-37.814&longitude=144.9633&hourly=temperature_2m,rain,cloudcover
*/
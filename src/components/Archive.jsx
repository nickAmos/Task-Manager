import { Link } from "react-router-dom";
import '../Styles/Archive.css';

export default function Archive( {archiveTasks, removeArchivedTask, removeAllArchived} ) {


    //need to map through archive tasks to use them??


    return(
        <div id="archive-body">

            <header>
                <div id="header-flex">
                    <h1 id="archive-title">Arachived tasks</h1>
                </div>
            </header>

            <section>               
                    {archiveTasks.length > 0 ? 
                        <>
                        {/*Below defines the  grid set up for when an archive task exists */}
                            <div class="grid-container">{archiveTasks.map((todo) => (<div> {todo.title ? //generates each archived task
                                    <div class="grid-item"> 
                                        <div key={todo.id} id="card-container">

                                            <div id="top-bar">
                                                {todo.taskType === 'Priority' ? <div>🎯</div> : null}
                                                {todo.taskType === 'Daily' ? <div>🔥</div> : null}
                                                {todo.taskType === 'Longterm' ? <div>🏆</div> : null}
                                                <h1>{todo.title}</h1> 
                                                <button id="trash-button" class="ui inverted red button" onClick={() => {removeArchivedTask(todo.id);}}>
                                                    <i class="trash alternate outline icon"></i>
                                                </button>
                                            </div>                        
                                        </div>
                                    </div>: null }  
                            </div>
                                    ))}

                            </div>
                        </>
                    : null}

                { archiveTasks.length === 0?
                    <div id="conditional-container"> 
                        <div id="flex-container">
                        <div id="no-render">
                            <p>no tasks, go grind.</p>
                        </div> 
                    </div>
                
                </div>: null}

                    

            </section>

        
            <footer>
            <div id="footer-flex">
                <div id="left-child">
                    <Link to='/'>
                        <button class="ui inverted white button">
                        <div id="go-home">
                            <i class="arrow alternate circle left outline icon"></i>
                            <p>Return to dashboard</p>
                        </div>
                        </button>
                    </Link>
                </div>
                <div id="right-child">
                    <button  onClick={() => {
                            removeAllArchived();
                        }} class="ui inverted red button"><p>Remove all completed</p></button>
                </div>
            </div>
            </footer>

        </div>
       
        
    )
}


/* https://open-meteo.com/en/docs#latitude=-37.814&longitude=144.9633&hourly=temperature_2m,rain,cloudcover
*/
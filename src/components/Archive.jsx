import { Link } from "react-router-dom";
import '../Styles/Archive.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";

export default function Archive( {archiveTasks, removeArchivedTask, removeAllArchived} ) {


    //need to map through archive tasks to use them??


    const [open, setOpen] = useState(false);
    const handleOpen = () => { 
        if (archiveTasks.length > 0) {
            setOpen(true); 
    } else {
        console.log('no');
    }};
    const handleClose = () =>  setOpen(false); 
    

    const style = {
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 450, bgcolor: '#101013', border: '2px solid #000', boxShadow: 24, p: 4,
        borderRadius: 5
      };


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
                        handleOpen();
                        }} class="ui inverted red button"><p>Remove all completed</p></button>
                </div>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">  
                        <Box sx={style}>
                        <div id="confirm-container">
                            <div id="box-one">
                                <p>Are you sure you want to remove all archived tasks?</p>
                            </div>
                            <div id="box-two">
                                <button onClick={() => {handleClose() 
                                }
                                } class="ui inverted button">Keep tasks</button>
                                <button onClick={() => {removeAllArchived();
                                    handleClose();
                                }} class="ui inverted red button" >Remove</button>
                            </div>
                        </div>
                        </Box>
                </Modal>
            </div>
            </footer>

        </div>
       
        
    )
}


/* https://open-meteo.com/en/docs#latitude=-37.814&longitude=144.9633&hourly=temperature_2m,rain,cloudcover
*/
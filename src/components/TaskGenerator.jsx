import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import '../Styles/TaskGenerator.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import 'semantic-ui-css/semantic.min.css'
import Modal from '@mui/material/Modal';
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";



export default function TaskGenerator( {archiveTask} ) {

    //All state for Tasks
    const [newObject, setNewObject] = useState('');
    const [timeline, setTimeLine] = useState('');
    const [tasktype, setTasktype] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [seeNotes, setSeeNotes] = useState(false);
    const [noteButton, setNoteButton] = useState(false);
    const [todosA, setTodosA] = useState([]);
    const [todosB, setTodosB] = useState([]);
    const [todosC, setTodosC] = useState([]);
    const [todosD, setTodosD] = useState([]);
    const [deletedItems, setDeletedItems] = useState(0);
    const [open, setOpen] = useState(false);
    const [dateDisplay ,setDateDisplay] = useState(new Date());
    //Keeps track of time
    useEffect(() => {
        var timer = setInterval(()=>setDateDisplay(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    });

    //Handles all task functionality
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  
    const handleDragDrop = (results) => {

        const {source, destination} = results;
       
        if (!(destination) || (source.droppableId === destination.droppableId && 
        source.index === destination.index) ) return;
                      
                    const sourceIndex = source.index;
                    const sourceDrop = source.droppableId;
                    const destinationIndex = destination.index;
                    const destinationDrop = destination.droppableId;
                    const copyofTodosA = [...todosA];
                    const copyofTodosB = [...todosB];
                    const copyofTodosC = [...todosC];
                    const copyofTodosD = [...todosD];

        if (destinationDrop === 'Archive') {
            console.log('dropped in archive');
            console.log('dropped in archive');
        }
         

                
            if (sourceDrop === 'Priority-Tasks') {
                let [removed] = copyofTodosA.splice(sourceIndex,1);
                setTodosA(copyofTodosA);
                if (destinationDrop === 'Priority-Tasks') {
                    copyofTodosA.splice(destinationIndex, 0, removed);
                    setTodosA(copyofTodosA);
                }
                if (destinationDrop === 'Daily-Tasks') {
                    copyofTodosB.splice(destinationIndex, 0, removed);
                    setTodosB(copyofTodosB);
                }
                if (destinationDrop === 'Longterm-Tasks') {
                    copyofTodosC.splice(destinationIndex, 0, removed);
                    setTodosC(copyofTodosC);
                }
                if (destinationDrop === 'Archive') {
                    archiveTask(removed);
                    setDeletedItems((prev) => prev + 1);
                    copyofTodosD.splice(destinationIndex, 0, removed);
                    setTodosD(copyofTodosD);
                }

            } else if (sourceDrop === 'Daily-Tasks') {
                let [removed] = copyofTodosB.splice(sourceIndex, 1);
                setTodosB(copyofTodosB);
                if (destinationDrop === 'Priority-Tasks') {
                    copyofTodosA.splice(destinationIndex, 0, removed);
                    setTodosA(copyofTodosA);
                }
                if (destinationDrop === 'Daily-Tasks') {
                    copyofTodosB.splice(destinationIndex, 0, removed);
                    setTodosB(copyofTodosB);
                }
                if (destinationDrop === 'Longterm-Tasks') {
                    copyofTodosC.splice(destinationIndex, 0, removed);
                    setTodosC(copyofTodosC);
                }
                if (destinationDrop === 'Archive') {
                    copyofTodosD.splice(destinationIndex, 0, removed);
                    setTodosD(copyofTodosD);
                }
            } else if (sourceDrop === 'Longterm-Tasks') {
                let [removed] = copyofTodosC.splice(sourceIndex, 1);
                setTodosC(copyofTodosC);
                if (destinationDrop === 'Priority-Tasks') {
                    copyofTodosA.splice(destinationIndex, 0, removed);
                    setTodosA(copyofTodosA);
                }
                if (destinationDrop === 'Daily-Tasks') {
                    copyofTodosB.splice(destinationIndex, 0, removed);
                    setTodosB(copyofTodosB);
                }
                if (destinationDrop === 'Longterm-Tasks') {
                    copyofTodosC.splice(destinationIndex, 0, removed);
                    setTodosC(copyofTodosC);
                }
                if (destinationDrop === 'Archive') {
                    archiveTask(removed);
                    setDeletedItems((prev) => prev + 1);
                    copyofTodosD.splice(destinationIndex, 0, removed);
                    setTodosD(copyofTodosD);
                }
            }

            
        }
    function handleSubmit(e) {
            //prevent default cancles the refreshing of the page upon submission of the form. 
            e.preventDefault()
            //The currentObject below is just the empty [object] defined by the 'todos' state.
            // it is being set in this function
            if(tasktype === 'Daily') {
                setTodosB(currentObject => {
                    return [
                        ...currentObject, 
                        {id: crypto.randomUUID(),
                        title: newObject,
                        timeLine: timeline,
                        taskType: tasktype,
                        due: date,
                        completed: false,
                        streak: 0,
                        notes: notes
                        
                    },
                    ]
                }) 
                
            }
            if(tasktype === 'Priority') {
                setTodosA(currentObject => {
                    return [
                        ...currentObject, 
                        {id: crypto.randomUUID(),
                        title: newObject,
                        timeLine: timeline,
                        taskType: tasktype,
                        due: date,
                        streak: 0,
                        notes: notes
                        
                    },
                    ]
                }) 
            }
            if(tasktype === 'Longterm') {
                setTodosC(currentObject => {
                    return [
                        ...currentObject, 
                        {id: crypto.randomUUID(),
                        title: newObject,
                        timeLine: timeline,
                        taskType: tasktype,
                        due: date,
                        streak: 0,
                        notes: notes
                    },
                    ]
                }) 
            }
            
    
        setNewObject('');
        setTimeLine('');
        setTasktype('');
        setNotes('');
        handleClose();
        }
    function deleteTask(id) {
        setTodosA(currentTasks => {
            return currentTasks.filter(todo => todo.id !== id); 
        })
        }
    
    function deleteTaskLong(id) {
        setTodosC(currentTasks => {
            return currentTasks.filter(todo => todo.id !== id); 
        })
        }
    function completeDaily(id, completed, streak) {
    
            setTodosB(currentTasks => {
                return currentTasks.map(todo => {
                    if (todo.id === id) {
                        if (completed === true) {
                            streak += 1
                        }
                        
                        return {...todo, completed, streak}
                    }
                    return todo;
                })
            })
        }

    //Styles modal
    const style = {
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
      };
      //render
    return(
        
        <>     
                <div className="addtask-container">
                    <div>
                        <p> Time : {dateDisplay.toLocaleTimeString()}  Date : {dateDisplay.toLocaleDateString()}</p>
                    </div>
                    <Button onClick={handleOpen}>
                        <div id="button-container">
                            <div>Add Task</div>
                            <Icon name="plus" size="large"/>
                        </div>
                    </Button> 
                </div>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <form onSubmit={handleSubmit} id="task-form">                                
                                <input value={newObject} type="text" placeholder="Task Name" id="item" onChange={e => setNewObject(e.target.value)}/>
                                <input type="date" onChange={e => setDate(e.target.value)} />
                                <input value={timeline} type="text" placeholder="type here" onChange={e => setTimeLine(e.target.value)} id="timeline"/>
                                <input type="text" placeholder="Add notes" value={notes} id="notes" onChange={e => setNotes(e.target.value)}/>
                                <div class="ui buttons">
                                    <button value='Priority' onClick={e => {setTasktype(e.target.value);}} class="ui blue basic button">Priority</button>
                                    <button value='Daily' onClick={e => {setTasktype(e.target.value);}} class="ui red basic button">Daily</button>
                                    <button value='Longterm' onClick={e => {setTasktype(e.target.value);}} class="ui green basic button">Long-Term</button>
                                </div> 
                            </form>
                        </Box>
                </Modal>        

            <DragDropContext onDragEnd={handleDragDrop}> 

            <div id="task-category-flex">
                <div id="priority-container">                        
                <Droppable droppableId="Priority-Tasks" type="group">
                    {(provided) => (
                        <div className="Priority-Tasks" {...provided.droppableProps} ref={provided.innerRef}>
                            {todosA.map((todo, index) => (
                                <Draggable draggableId={todo.id} key={todo.id} index={index} >
                                    {(provided) => (
                                        <>
                                        <div key={todo.id} id="todo-container"
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}> 
                                            <div id="todo-textbox">
                                                <h1>{todo.title}</h1>
                                                <p>ID: {todo.id}</p>
                                                <p>Index: {index}</p>
                                                <p>task type: {todo.taskType}</p>
                                                <p>Due: {todo.due}</p>
                                                {seeNotes ? <p>{todo.notes}</p> : null}
                                                <button onClick={() => {setSeeNotes(!seeNotes)
                                                setNoteButton(!noteButton)}}>{!noteButton ? 'See Notes' : 'Hide'}</button>
                                                <button onClick={() => {deleteTask(todo.id);
                                                                        archiveTask(todo);
                                                                        setDeletedItems((item) => item + 1);
                                                    }}>Complete</button>
                                                
                                            </div>
                                        </div>
                                        </>
                                        )}

                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                
                </Droppable>
                </div>  

                <div id="daily-container">                        
                <Droppable droppableId="Daily-Tasks" type="group">
                    {(provided) => (
                        <div className="Daily-Tasks" {...provided.droppableProps} ref={provided.innerRef}>
                            {todosB.map((todo, index) => (
                                <Draggable draggableId={todo.id} key={todo.id} index={index} >
                                    {(provided) => (
                                        <div key={todo.id} id="todo-container"
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}>
                                            <div id="todo-textbox-daily">
                                                <h1>{todo.title}</h1>
                                                <p>ID: {todo.id}</p>
                                                <p>Index: {index}</p>
                                                <p>task type: {todo.taskType}</p>
                                                <p>Due: {todo.due}</p>
                                                <p>Streak: {todo.streak}</p>
                                                {seeNotes ? <p>{todo.notes}</p> : null}
                                                <button onClick={() => {setSeeNotes(!seeNotes)
                                                setNoteButton(!noteButton)}}>{!noteButton ? 'See Notes' : 'Hide'}</button>
                                                <input type="checkbox" checked={todo.completed}
                                                        onChange={e => completeDaily(todo.id, e.target.checked, todo.streak)}/>
                                                </div>
                                        </div>
                                        )}

                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                
                </Droppable>
                </div>

                <div id="longterm-container">                     
                <Droppable droppableId="Longterm-Tasks" type="group">
                    {(provided) => (
                        <div className="Longterm-Tasks" {...provided.droppableProps} ref={provided.innerRef}>
                            {todosC.map((todo, index) => (
                                <Draggable draggableId={todo.id} key={todo.id} index={index} >
                                    {(provided) => (
                                        <div key={todo.id} id="todo-container"
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}>
                                            <div id="todo-textbox">
                                                <h1>{todo.title}</h1>
                                                <p>ID: {todo.id}</p>
                                                <p>Index: {index}</p>
                                                <p>task type: {todo.taskType}</p>
                                                <p>Due: {todo.due}</p>
                                                {seeNotes ? <p>{todo.notes}</p> : null}
                                                <button onClick={() => {setSeeNotes(!seeNotes)
                                                setNoteButton(!noteButton)}}>{!noteButton ? 'See Notes' : 'Hide'}</button>
                                                <button onClick={() => {
                                                    archiveTask(todo)
                                                    deleteTaskLong(todo.id)
                                                    setDeletedItems((prev) => prev + 1 )}}>Complete</button>
                                                </div>
                                        </div>
                                        )}

                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                
                </Droppable>
                </div> 
            </div> 
             <div className="RemovalContainer">
             <div>   
                <Link to='/archive' onClick={() => {
                    archiveTask('test');
                }}> 
                       
                    <Droppable droppableId="Archive" type="group">
                
                        {(provided) => (
                            <div className="droppableContainerArchive" 
                                {...provided.droppableProps} ref={provided.innerRef}>
                                    <p>Archived tasks: {deletedItems}</p>
                                </div>
                        )}
                    </Droppable>
                   
                    </Link>
                </div>   
                
                <div>
                <Droppable droppableId="Trash" type="group">
                    
                    {(provided) => (
                        <div className="droppableContainerTrash" 
                        {...provided.droppableProps} ref={provided.innerRef}>
                            Delete

                        </div>
                )}
                </Droppable>
                </div>

            </div> 

        </DragDropContext> 
        </>
       
    )
}






/*  
Things to add:
    - local storage preservation. 
    - Styling :
         - framer motion animations to cards when they are completed  extra:: add dragging animations?
         - apple font 
*/
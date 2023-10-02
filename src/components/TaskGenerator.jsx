import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import '../Styles/TaskGenerator.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import 'semantic-ui-css/semantic.min.css'
import Modal from '@mui/material/Modal';
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";




export default function TaskGenerator( {archiveTask, completedTasks} ) {

    //All state for Tasks
    const [newObject, setNewObject] = useState('');
    const [timeline, setTimeLine] = useState('');
    const [tasktype, setTasktype] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    const [seeNotesPriority, setSeeNotesPriority] = useState(true);
    const [noteButtonPriority, setNoteButtonPriority] = useState(true);
    const [seeNotesDaily, setSeeNotesDaily] = useState(false);
    const [noteButtonDaily, setNoteButtonDaily] = useState(false);
    const [seeNotesLong, setSeeNotesLong] = useState(false);
    const [noteButtonLong, setNoteButtonLong] = useState(false);

    const [todosA, setTodosA] = useState([]);
    const [todosB, setTodosB] = useState([]);
    const [todosC, setTodosC] = useState([]);
    const [todosD, setTodosD] = useState([]);
    const [open, setOpen] = useState(false);


    const [dateDisplay ,setDateDisplay] = useState(new Date());
    //Keeps track of time
    useEffect(() => {
        let timer = setInterval(()=>setDateDisplay(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    }); 
//Handles local Storage
    useEffect(() => {
        const priority = window.localStorage.getItem('PriorityTodos');
        if (priority !== null) setTodosA(JSON.parse(priority));
        const daily = window.localStorage.getItem('DailyTodos');
        if (daily !== null) setTodosB(JSON.parse(daily));
        const longterm = window.localStorage.getItem('LongtermTodos');
        if (longterm !== null) setTodosC(JSON.parse(longterm));
        const Archive = window.localStorage.getItem('ArchiveDrop');
        if (Archive !== null) setTodosD(JSON.parse(Archive));
        const deleted = window.localStorage.getItem('Deleted');
        
    }
    , [])

    useEffect(() => {
        window.localStorage.setItem('PriorityTodos', JSON.stringify(todosA));
        window.localStorage.setItem('DailyTodos', JSON.stringify(todosB));
        window.localStorage.setItem('LongtermTodos', JSON.stringify(todosC));
        window.localStorage.setItem('ArchiveDrop', JSON.stringify(todosD));
    }, [todosA, todosB, todosC, todosD])

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
                    archiveTask(removed);
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
                        notes: notes,
                        streakColor: 'green'
                        
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

        

    function completeDaily(id, completed, streak, streakColor) {

        if (streakColor === 'green') {

           console.log('ran');
    
            setTodosB(currentTasks => {
                return currentTasks.map(todo => {
                    if (todo.id === id) {
                        if (completed === true) {
                            streak += 1
                            streakColor = 'grey';
                        }
                        
                        return {...todo, completed, streak, streakColor}
                    }
                    return todo;
                })
            })
        }

        
    }

    function resetStreak(id, streak, streakColor) {

        console.log('also ran');

        setTodosB(currentTasks => {
            return currentTasks.map(todo => {
                if (todo.id === id) {

                        streak = 0;
                        streakColor = 'green';
                    
                    
                    return {...todo, streak, streakColor}
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
                <div className="Header">

                    <div id="title-container">
                        <h1>Task Manager</h1>
                    </div>
                    
                    <div id="button-container">
                        <Button onClick={handleOpen}>
                            <div id="button-container">
                                
                                <Icon name="plus" size="large"/>
                            </div>
                        </Button> 
                    </div>

                    <div id="timedisplay-container">
                        {<p> {dateDisplay.toLocaleTimeString()}  ||  {dateDisplay.toLocaleDateString()}</p> }
                    </div>

                </div>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <form onSubmit={handleSubmit} id="task-form">                                
                                <input value={newObject} autocomplete="off" type="text" placeholder="Task Name" id="item" onChange={e => setNewObject(e.target.value)} required/>
                                <input type="date" onChange={e => setDate(e.target.value)} />
                                <input value={timeline} type="text" placeholder="type here" onChange={e => setTimeLine(e.target.value)} id="timeline"/>
                                <input type="text" placeholder="Add notes" autocomplete="off" value={notes} id="notes" onChange={e => setNotes(e.target.value)}/>
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
                <div className="Task-Type-container">
                    <div id="task-icon-name">
                        <div id="task-counter">{todosA.length}</div>  
                            <h2>Priority</h2>
                    </div>
                    <div id="seemore-container">
                        <button class="mini ui grey basic button" onClick={() => {setSeeNotesPriority(!seeNotesPriority)
                                            setNoteButtonPriority(!noteButtonPriority)}}>{!noteButtonPriority ? 'See Notes' : 'Hide Notes'}</button>            
                    </div>
                </div> 
                <div id="line-break"></div>          
                <Droppable droppableId="Priority-Tasks" type="group">
                    {(provided) => (
                        <div className="Priority-Tasks" {...provided.droppableProps} ref={provided.innerRef}>
                            {todosA.map((todo, index) => (
                                <Draggable draggableId={todo.id} key={todo.id} index={index} >
                                    {(provided) => (
                                        
                                        <div key={todo.id} id="todo-container"
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}> 
                                            <div id="todo-textbox">
                                            <div id="title-date">
                                                    <div id="title"><h1>{todo.title}</h1></div>
                                                    <div id="emoji">🎯</div>
                                                </div>
                                                <br></br>
                                                {seeNotesPriority ? <p id="notes">{todo.notes}</p> : null}
                                                
                                                <div id="delete-complete">
                                                    <div id="checked">
                                                        <Icon onClick={() => {deleteTask(todo.id);
                                                                              archiveTask(todo);}} 
                                                        name="check square outline" size="large"></Icon> 
                                                    </div>
                                                    <div id="date"><p>{todo.due}</p></div>
                                                    <div id="trash">
                                                        <Icon onClick={() => {deleteTask(todo.id)}}
                                                         name="trash alternate outline"color="red" size="large"></Icon> 
                                                    </div>
                                                </div>
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

{/* place switch arrow*/} 

                <div id="daily-container">
                <div className="Task-Type-container">
                <div id="task-icon-name">
                <div id="task-counter">{todosB.length}</div> 
                        <h2>Daily</h2>
                    </div>
                    <div id="seemore-container">
                        <button class="mini ui grey basic button" onClick={() => {
                            setSeeNotesDaily(!seeNotesDaily);
                            setNoteButtonDaily(!noteButtonDaily);
                            }} >
                            {!noteButtonDaily ? 'See Notes' : 'Hide'}
                        </button>
                    </div>
                </div> 
                <div id="line-break"></div>                        
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
                                            <div id="todo-textbox">
                                                <div id="title-date">
                                                    <div id="title"><h1>{todo.title}</h1></div>
                                                    <div id="emoji">
                                                        <div>{todo.streak}</div>
                                                        <div> 🔥</div>
                                                    </div>
                                                </div>
                                                <br></br>
                                                {seeNotesDaily ? <p id="notes">{todo.notes}</p> : null}
                                                
                                                <div id="delete-complete">
                                                    <div id="streaks-container">
                                                         <input type="checkbox" checked={todo.completed}
                                                        onClick={e => {completeDaily(todo.id, e.target.checked, todo.streak, todo.streakColor)}}/>
                                                        <Icon  
                                                        name="check square outline" size="large" color={todo.streakColor}></Icon>
                                                        
                                                    </div>
                                                
                                                    
                                                    <div id="trash">
                                                        <Icon onClick={() => resetStreak(todo.id, todo.streak, todo.streakColor)}
                                                         name="redo alternate" color="red" size="large"></Icon> 
                                                    </div>

                                                </div>
                                            
                                                
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

{/* place switch arrow*/} 

                <div id="longterm-container"> 
                <div className="Task-Type-container">
                    <div id="task-icon-name">
                        <div id="task-counter">{todosC.length}</div> 
                        <h2>Long term</h2>
                    </div>
                    <div id="seemore-container">
                        <button class="mini ui grey basic button" onClick={() => {setSeeNotesLong(!seeNotesLong)
                                            setNoteButtonLong(!noteButtonLong)}}>{!noteButtonLong ? 'See Notes' : 'Hide'}</button>
                    </div>
                </div> 
                <div id="line-break"></div>                    
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
                                            <div id="title-date">
                                                    <div id="title"><h1>{todo.title}</h1></div>
                                                    <div id="emoji">🏆</div>
                                                </div>
                                                <br></br>
                                                {seeNotesLong ? <p id="notes">{todo.notes}</p> : null}
                                                
                                                <div id="delete-complete">
                                                    <div id="checked">
                                                        <Icon onClick={() => {deleteTaskLong(todo.id);
                                                                              archiveTask(todo);}} 
                                                        name="check square outline" size="large"></Icon> 
                                                    </div>
                                                    <div id="date"><p>{todo.due}</p></div>
                                                    <div id="trash">
                                                        <Icon onClick={() => {deleteTaskLong(todo.id)}}
                                                         name="trash alternate outline"color="red" size="large"></Icon> 
                                                    </div>
                                                </div>
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
             <div className="Footer-container">
                <div id="archive-container">   
                    <Link to='/archive' className="droppableContainerArchive"> 
                        <Droppable droppableId="Archive" type="group">
                            {(provided) => (
                                <div id="dropcontain"  
                                    {...provided.droppableProps} ref={provided.innerRef}>
                                        <div id="reveal-container">
                                            <div class="ui move up reveal">
                                                <div class="visible content">
                                                    <div id="icon-container">
                                                        <Icon name="cloud upload" size="large"/>
                                                    </div>
                                                </div>
                                                <div class="hidden content" id='hidden-content'>
                                                    <div id="text-container">
                                                    <p>Archive</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            )}
                        </Droppable>
                    </Link>
                </div>   
                
                <div id='delete-container'>
                    <Droppable droppableId="Trash" type="group">       
                        {(provided) => (
                            <div className="droppableContainerTrash" 
                            {...provided.droppableProps} ref={provided.innerRef}>
                                    <div id="reveal-container">
                                            <div  class="ui move up reveal">
                                                <div class="visible content">
                                                    <div id="icon-container">
                                                        <Icon name="trash" size="large"/>
                                                    </div>
                                                </div>
                                                <div class="hidden content" id='hidden-content'>
                                                    <div id="text-container">
                                                    <p>Delete</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
    - Styling :
         - framer motion animations to cards when they are completed  extra:: add dragging animations?
         - apple font 
*/
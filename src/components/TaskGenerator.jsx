import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import '../Styles/TaskGenerator.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import 'semantic-ui-css/semantic.min.css'
import Modal from '@mui/material/Modal';
import { Icon } from "semantic-ui-react";

export default function TaskGenerator() {

   
        
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
                    copyofTodosD.splice(destinationIndex, 0, removed);
                    setTodosD(copyofTodosD);
                    setDeletedItems((item) => item + 1);
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
                    setDeletedItems((item) => item + 1);
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
                    copyofTodosD.splice(destinationIndex, 0, removed);
                    setTodosD(copyofTodosD);
                    setDeletedItems((item) => item + 1);
                }
            }

            
        }
    

    const [newObject, setNewObject] = useState('');
    const [timeline, setTimeLine] = useState('');
    const [tasktype, setTasktype] = useState('');

    const [todos, setTodos] = useState([]);
    const [todosA, setTodosA] = useState([]);
    const [todosB, setTodosB] = useState([]);
    const [todosC, setTodosC] = useState([]);
    const [todosD, setTodosD] = useState([]);

    const [deletedItems, setDeletedItems] = useState(0);
    const [open, setOpen] = useState(false);
    const [addTask, setAddTask] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  
    function handleSubmit(e) {
        //prevent default cancles the refreshing of the page upon submission of the form. 
        e.preventDefault()
        //The currentObject below is just the empty [object] defined by the 'todos' state.
        // it is being set in this function
        if(tasktype === 'Daily') {
            setTodosA(currentObject => {
                return [
                    ...currentObject, 
                    {id: crypto.randomUUID(),
                    title: newObject,
                    timeLine: timeline,
                    taskType: tasktype
                },
                ]
            }) 
            
        }
        if(tasktype === 'Priority') {
            setTodosB(currentObject => {
                return [
                    ...currentObject, 
                    {id: crypto.randomUUID(),
                    title: newObject,
                    timeLine: timeline,
                    taskType: tasktype
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
                    taskType: tasktype
                },
                ]
            }) 
        }
        

    setNewObject('');
    setTimeLine('');
    setTasktype('');
    handleClose();
    }

   


    useEffect(() => {
        if (todos.length > 0) {
            setAddTask(false);
        } else {
            setAddTask(true);
        }
    }, [todos])


    return(
        <>
            <div>
                <div className="addtask-container">
                {addTask ? 
                    <Button onClick={handleOpen}>
                        <div id="button-container">
                            <div>Add Task</div>
                            <Icon name="plus" size="large"/>
                        </div>
                    </Button> : null}
            </div>


                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form onSubmit={handleSubmit} id="task-form">

                                
                                <input
                                        value={newObject}
                                        type="text"
                                        placeholder="Task Name"
                                        id="item"
                                        onChange={e => setNewObject(e.target.value)}
                                        />

                                    

                                
                                    <input
                                        value={timeline}
                                        type="text"
                                        placeholder="type here"
                                        onChange={e => setTimeLine(e.target.value)}
                                        id="timeline"
                                        />
                                <div class="ui buttons">
                                        <button value='Daily' onClick={e => {setTasktype(e.target.value);}} class="ui red basic button">Daily</button>
                                        <button value='Priority' onClick={e => {setTasktype(e.target.value);}} class="ui blue basic button">Priority</button>
                                        <button value='Longterm' onClick={e => {setTasktype(e.target.value);}} class="ui green basic button">Long-Term</button>
                                </div> 
                            </form>
                        </Box>
                </Modal>
        </div>



            <DragDropContext onDragEnd={handleDragDrop}> 

            <div id="task-category-flex">
                <div id="priority-container">                        
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
                                                <h1>{todo.title}</h1>
                                                <p>ID: {todo.id}</p>
                                                <p>Index: {index}</p>
                                                <p>task type: {todo.taskType}</p>
                                                <p>Complete by: {todo.timeLine}</p>
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
                                            <div id="todo-textbox">
                                                <h1>{todo.title}</h1>
                                                <p>ID: {todo.id}</p>
                                                <p>Index: {index}</p>
                                                <p>task type: {todo.taskType}</p>
                                                <p>Complete by: {todo.timeLine}</p>
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
                                                <p>Complete by: {todo.timeLine}</p>
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
                                          
                <Droppable droppableId="Archive" type="group">
                    
                    {(provided) => (
                        <div className="droppableContainerArchive" 
                        {...provided.droppableProps} ref={provided.innerRef}>
                            <p>Archived tasks: {deletedItems}</p>

                        </div>
                )}
                </Droppable>

                <Droppable droppableId="Trash" type="group">
                    
                    {(provided) => (
                        <div className="droppableContainerTrash" 
                        {...provided.droppableProps} ref={provided.innerRef}>
                            Delete

                        </div>
                )}
                </Droppable>

            </div> 

        </DragDropContext>
        
            

            
        </>
    )
}







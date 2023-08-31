import { useState } from "react";
import "../Styles/TaskGenerator.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export default function TaskGenerator() {

    const handleDragDrop = () => {
        console.log('hello there')
    }

    const [newObject, setNewObject] = useState('');
    const [timeline, setTimeLine] = useState('');
    const [todos, setTodos] = useState([]);
  
    function handleSubmit(e) {
        //prevent default cancles the refreshing of the page upon submission of the form. 
        e.preventDefault()
        //The currentObject below is just the empty [object] defined by the 'todos' state.
        // it is being set in this function
        setTodos(currentObject => {
            return [
                ...currentObject, 
                {id: crypto.randomUUID(),
                title: newObject,
                timeLine: timeline,
            },
            ]
        }) 
        //Below resets the values of the form input to empty strings.
        setNewObject('');
        setTimeLine('');
    }


    function deleteTask(id) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id);
        })

    }


    return(
        <>
        <DragDropContext onDragEnd={handleDragDrop}>
            <form onSubmit={handleSubmit} id="task-form">

            <label htmlFor="item">Create Task</label>
            <input
                    value={newObject}
                    type="text"
                    placeholder="type here"
                    id="item"
                    onChange={e => setNewObject(e.target.value)}
                    />
            <label htmlFor="timeline">Timeline</label>
                <input
                    value={timeline}
                    type="text"
                    placeholder="type here"
                    onChange={e => setTimeLine(e.target.value)}
                    id="timeline"
                    />
            
            <input type="submit" value='submit'/> 
               
            </form>

            <Droppable droppableId="ROOT" type="group" id="drop-container">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>

                        {todos.map((todo, index) => ( 
                            <Draggable draggableId={todo.id} key={todo.id} index={index}>

                                {(provided) => (
                                    <div key={todo.id} id="todo-container"
                                     {...provided.dragHandleProps}
                                     {...provided.draggableProps}
                                     ref={provided.innerRef}>
                                        <div id="todo-textbox">
                                            <h1>{todo.title}</h1>
                                            <p>ID: {todo.id}</p>
                                            <p>{index}</p>
                                            <p>Complete by: {todo.timeLine}</p>
                                            <button onClick={() => deleteTask(todo.id)}>delete</button>
                                        
                                        </div>
                                     </div>
                                      )}

                            </Draggable>  
                        ))}

                    </div>
            )}
            </Droppable>
        </DragDropContext>
        </>
    )
}

/* 
dragdropcontext:
listens for events that occurs and then updates the state. 

Droppable:
areas that draggable elements can be dropped. If a div 
is not droppable then no elements will be able to be dropped
there. 


draggable:
elements that can be dragged. 

strict mode must be turned off for this to work. 




*/
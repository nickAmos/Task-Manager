import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import '../Styles/TaskGenerator.css';

export default function TaskGenerator() {

   
        
    const handleDragDrop = (results) => {

        const {source, destination} = results;
       
        if (!(destination) || (source.droppableId === destination.droppableId && 
        source.index === destination.index) ) return;
                      
                    const sourceIndex = source.index;
                    const sourceDrop = source.droppableId;
                    const destinationIndex = destination.index;
                    const destinationDrop = destination.droppableId;
                    const copyofTodos = [...todos];
                    const copyofTodosA = [...todosA];
                    const copyofTodosB = [...todosB];
                    const copyofTodosC = [...todosC];

        if (sourceDrop === 'SPAWN') {
                let [removed] = copyofTodos.splice(sourceIndex, 1);    
                setTodos(copyofTodos);
                if (destinationDrop === 'SPAWN') {
                    copyofTodos.splice(destinationIndex, 0, removed);
                    setTodos(copyofTodos);
                }
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
                
            } else if (sourceDrop === 'Priority-Tasks') {
                let [removed] = copyofTodosA.splice(sourceIndex,1);
                setTodosA(copyofTodosA);
                if (destinationDrop === 'SPAWN') {
                    copyofTodos.splice(destinationIndex, 0, removed);
                    setTodos(copyofTodos);
                }
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

            } else if (sourceDrop === 'Daily-Tasks') {
                let [removed] = copyofTodosB.splice(sourceIndex, 1);
                setTodosB(copyofTodosB);
                if (destinationDrop === 'SPAWN') {
                    copyofTodos.splice(destinationIndex, 0, removed);
                    setTodos(copyofTodos);
                }
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
            } else if (sourceDrop === 'Longterm-Tasks') {
                let [removed] = copyofTodosC.splice(sourceIndex, 1);
                setTodosC(copyofTodosC);
                if (destinationDrop === 'SPAWN') {
                    copyofTodos.splice(destinationIndex, 0, removed);
                    setTodos(copyofTodos);
                }
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
            }
        }
    

    const [newObject, setNewObject] = useState('');
    const [timeline, setTimeLine] = useState('');
    const [todos, setTodos] = useState([]);
    const [todosA, setTodosA] = useState([]);
    const [todosB, setTodosB] = useState([]);
    const [todosC, setTodosC] = useState([]);
  
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


    return(
        <>
        
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

            <DragDropContext onDragEnd={handleDragDrop}> 
            <Droppable droppableId="SPAWN" type="group">
                
                {(provided) => (
                    <div className="droppableContainerSPAWN" {...provided.droppableProps} ref={provided.innerRef}>
                
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
                                            <p>Index: {index}</p>
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
        </DragDropContext>
        
            

            
        </>
    )
}








/* OLD droppables :

        <DragDropContext onDragEnd={handleDragDrop}> {/*See top of page*/
            /* Drobbale elements are the containers for where elements
            can be dropped, they must have a droppableID which is used in
            the source and destination of the results of each drag event
            if we have multiple containers we can have different ID's to allowus
            to keep track of where each element is. }
            <Droppable droppableId="SPAWN" type="group">
                {/*We must make a function that generates a droppable Div with the needed props destructed out
                 }
                {(provided) => (
                    <div className="droppableContainerSPAWN" {...provided.droppableProps} ref={provided.innerRef}>
                {/*Here we are mapping out Todos variable to draggable elements, notice we include the
                index of each mapped element in the mapping which we will use for repositioning upon drag }
                        {todos.map((todo, index) => ( 
                            <Draggable draggableId={todo.id} key={todo.id} index={index}>
                {/*Within the draggable element we must also make a function that contains what the draggable element is,
                in this case its our mapped Todos, like the droppable child was passed droppableProps, the draggable
                children must be passed draggableProps }
                                {(provided) => (
                                    <div key={todo.id} id="todo-container"
                                     {...provided.dragHandleProps}
                                     {...provided.draggableProps}
                                     ref={provided.innerRef}>
                                        <div id="todo-textbox">
                                            <h1>{todo.title}</h1>
                                            <p>ID: {todo.id}</p>
                                            <p>Index: {index}</p>
                                            <p>Complete by: {todo.timeLine}</p>
                                            <button onClick={() => deleteTask(todo.id)}>delete</button>
                                        </div>
                                     </div>
                                      )}

                            </Draggable>  
                        ))}
                {provided.placeholder} {/*This ensures that when an element is picked up
                the parent container doesnt reduce its size due to the element being removed }

                    </div>
            )}
            </Droppable>

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
                                            <p>Complete by: {todo.timeLine}</p>
                                            <button onClick={() => deleteTask(todo.id)}>delete</button>
                                        </div>
                                     </div>
                                      )}

                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
             
            </Droppable>

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
                                            <p>Complete by: {todo.timeLine}</p>
                                            <button onClick={() => deleteTask(todo.id)}>delete</button>
                                        </div>
                                     </div>
                                      )}

                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
             
            </Droppable>
        </DragDropContext>



        delete button:
        function deleteTask(id) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id);
        })

    }
*/
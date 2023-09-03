import { useState } from "react";
import "../Styles/TaskGenerator.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export default function TaskGenerator() {

    /*Results is an object that containes an object with helpful info about
    individual element, the source is the initial position and the destination is the
    droppped position:
    
    {draggableID: example123,
        type: 'group,
        source: {index: 0, droppableId: conatinerOne},
        destination: {index: 1, droppableId: ContainerTwo}
        (there are others like mode and reason too.) }

    Above is an example of an element being dragged from the top position of containerOne
    to the second position of containerTwo.


    }*/
    const handleDragDrop = (results) => {
        const {source, destination, type} = results;
        {/* Destructuring parts of the results to create varibales out of `
        console.log(`
        Start DroppableID: ${source.droppableId}
        Start Index: ${source.index}
        End DroppableID: ${destination.droppableId} 
        End Index: ${destination.index}
                    `
                    ); */}

        if (!(destination) || (source.droppableId === destination.droppableId && 
            source.index === destination.index) ) return;
            {/*Essentially if the position of an element doesnt change at all return early
        to avoid upcoming logic */}

        const sourceIndex = source.index;
        const sourceDrop = source.droppableId;
        const destinationIndex = destination.index;
        const destinationDrop = destination.droppableId;
        const copyofTodos = [...todos];
        const copyofTodosA = [...todosA];
        const copyofTodosB = [...todosB];
        


        if (sourceDrop === 'ROOT') {
            let [removed] = copyofTodos.splice(sourceIndex, 1);    
            setTodos(copyofTodos);
            if (destinationDrop === 'ROOT') {
                copyofTodos.splice(destinationIndex, 0, removed);
                setTodos(copyofTodos);
            }
            if (destinationDrop === 'ContainerA') {
                copyofTodosA.splice(destinationIndex, 0, removed);
                setTodosA(copyofTodosA);
            }
            if (destinationDrop === 'ContainerB') {
                copyofTodosB.splice(destinationIndex, 0, removed);
                setTodosB(copyofTodosB);
            }
            
        } else if (sourceDrop === 'ContainerA') {
            let [removed] = copyofTodosA.splice(sourceIndex,1);
            setTodosA(copyofTodosA);
            if (destinationDrop === 'ROOT') {
                copyofTodos.splice(destinationIndex, 0, removed);
                setTodos(copyofTodos);
            }
            if (destinationDrop === 'ContainerA') {
                copyofTodosA.splice(destinationIndex, 0, removed);
                setTodosA(copyofTodosA);
            }
            if (destinationDrop === 'ContainerB') {
                copyofTodosB.splice(destinationIndex, 0, removed);
                setTodosB(copyofTodosB);
            }

        } else if (sourceDrop === 'ContainerB') {
            let [removed] = copyofTodosB.splice(sourceIndex, 1);
            setTodosB(copyofTodosB);
            if (destinationDrop === 'ROOT') {
                copyofTodos.splice(destinationIndex, 0, removed);
                setTodos(copyofTodos);
            }
            if (destinationDrop === 'ContainerA') {
                copyofTodosA.splice(destinationIndex, 0, removed);
                setTodosA(copyofTodosA);
            }
            if (destinationDrop === 'ContainerB') {
                copyofTodosB.splice(destinationIndex, 0, removed);
                setTodosB(copyofTodosB);
            }
        }

        
        
        
            

            
        
        {/*Above we are creating a copy of our Todos State and then using the index of both the 
    source of the element and its destination we are creating a varibale that holds the value of the 
todo that was removed from one container and then altering our copy of the Todos array such that this
element is removed, finally we add the removed todo back into its new position with the destination index
and setTodos to this new order.  */}
        
    }

    const [newObject, setNewObject] = useState('');
    const [timeline, setTimeLine] = useState('');
    const [todos, setTodos] = useState([]);
    const [todosA, setTodosA] = useState([]);
    const [todosB, setTodosB] = useState([]);
  
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

            {/*DragDropContext is like the senario for the dragging
        and dropping elements */}
        <DragDropContext onDragEnd={handleDragDrop}> {/*See top of page*/}
            {/* Drobbale elements are the containers for where elements
            can be dropped, they must have a droppableID which is used in
            the source and destination of the results of each drag event
            if we have multiple containers we can have different ID's to allowus
            to keep track of where each element is. */}
            <Droppable droppableId="ROOT" type="group">
                {/*We must make a function that generates a droppable Div with the needed props destructed out
                 */}
                {(provided) => (
                    <div className="droppableContainerROOT" {...provided.droppableProps} ref={provided.innerRef}>
                {/*Here we are mapping out Todos variable to draggable elements, notice we include the
                index of each mapped element in the mapping which we will use for repositioning upon drag */}
                        {todos.map((todo, index) => ( 
                            <Draggable draggableId={todo.id} key={todo.id} index={index}>
                {/*Within the draggable element we must also make a function that contains what the draggable element is,
                in this case its our mapped Todos, like the droppable child was passed droppableProps, the draggable
                children must be passed draggableProps */}
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
                the parent container doesnt reduce its size due to the element being removed */}

                    </div>
            )}
            </Droppable>

            <Droppable droppableId="ContainerA" type="group">
                {(provided) => (
                    <div className="ContainerA" {...provided.droppableProps} ref={provided.innerRef}>
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

            <Droppable droppableId="ContainerB" type="group">
                {(provided) => (
                    <div className="ContainerB" {...provided.droppableProps} ref={provided.innerRef}>
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
OLD logic:
if((source.droppableId === destination.droppableId) && (sourceDrop === 'ROOT')) {
                const [removedTodo] = copyofTodos.splice(sourceIndex, 1);
                copyofTodos.splice(destinationIndex, 0, removedTodo);
                setTodos(copyofTodos);
                console.log('1 fired');
                return;
            }

            if((source.droppableId === destination.droppableId) && (sourceDrop === 'ContainerA')) {
                const [removedTodo] = copyofTodosA.splice(sourceIndex, 1);
                copyofTodosA.splice(destinationIndex, 0, removedTodo);
                setTodos(copyofTodosA);
                console.log('2 fired');
                return;
            }

            if ( !(source.droppableId === destination.droppableId) && (destinationDrop === 'ContainerA')) {
                const [removedTodo] = copyofTodos.splice(sourceIndex, 1);
                copyofTodosA.splice(destinationIndex, 0, removedTodo);
                copyofTodos.splice(sourceIndex, 1);
                setTodos(copyofTodos);
                setTodosA(copyofTodosA);
                console.log('3 fired');
                console.log("Items in Root:" + todos.length + "/" + copyofTodos.length);
                console.log("Items in ConA:" + todosA.length + "/" + copyofTodosA.length);
                console.log("removed item:" + removedTodo.id);
                return;
            }

            if ( !(source.droppableId === destination.droppableId) && destination.droppableId === 'ROOT') {
                const [removedTodo] = copyofTodosA.splice(sourceIndex, 1);
                copyofTodos.splice(destinationIndex, 0, removedTodo);
                copyofTodosA.splice(sourceIndex, 1);
                setTodos(copyofTodos);
                setTodosA(copyofTodosA);
                console.log('4 fired');
                console.log("Items in Root:" + todos.length + "/" + copyofTodos.length);
                console.log("Items in ConA:" + todosA.length + "/" + copyofTodosA.length);
                console.log("removed item:" + removedTodo.id);
                return;
            }




*/
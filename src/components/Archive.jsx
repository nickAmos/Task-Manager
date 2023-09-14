export default function Archive( {archiveTasks} ) {


    //need to map through archive tasks to use them??
    


    console.log('passing down' + archiveTasks);

    return(
        <>
        <h1>Arachive tasks</h1>
        {archiveTasks.map((todo) => (
        
            
        <>
            <div>
                <h1>{todo.title}</h1>
                <p>ID: {todo.id}</p>
      
                <p>task type: {todo.taskType}</p>
                <p>Due: {todo.due}</p>
            </div>
                
        </>
        ))}

        </>
        
    )
}
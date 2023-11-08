
import './App.css';
import Archive from './components/Archive';
import TaskGenerator from './components/TaskGenerator';
import { Route, Routes} from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {

  const [archiveTasks, setArchiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const archive = window.localStorage.getItem('Archive');
    if (archive !== null) setArchiveTasks(JSON.parse(archive));
    const completed = window.localStorage.getItem('Completed');
    if (completed !== null) setCompletedTasks(JSON.parse(completed));
  }, [])

  useEffect(() => {
    window.localStorage.setItem('Archive', JSON.stringify(archiveTasks))
    window.localStorage.setItem('Completed', JSON.stringify(completedTasks))
    console.log(archiveTasks.length);
    setCompletedTasks(archiveTasks.length);
}, [archiveTasks]);

  const archiveTask = (task) => { 
    setArchiveTasks((current) =>{
      return [...current, task];
    } )  
  }

function removeAllArchived() {
    setArchiveTasks([]);
  }

  const removeArchivedTask = (id) => {
    setArchiveTasks( current => {
      return current.filter(task => task.id !== id)
    })
  }
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<TaskGenerator archiveTask={archiveTask} completedTasks={completedTasks} />} />
        <Route path='/archive' element={<Archive archiveTasks={archiveTasks}
        removeArchivedTask={removeArchivedTask}
        removeAllArchived={removeAllArchived}/>} />

      </Routes>
    </div>
  );
}

export default App;


/*  
Things to add:
    - Styling :
         overall stlying so everthing matches (fonts ect.)
*/
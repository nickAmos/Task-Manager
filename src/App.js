
import './App.css';
import Archive from './components/Archive';
import TaskGenerator from './components/TaskGenerator';
import { Route, Routes} from "react-router-dom";
import { useState } from 'react';




function App() {

  const [archiveTasks, setArchiveTasks] = useState([]);

  const archiveTask = (task) => {
    console.log(task);
    setArchiveTasks((current) =>{
      return [...current, task];
    } )
    
  }

  console.log(archiveTasks);

  
  return (
    <div>
      <Routes>
        <Route path='/' element={<TaskGenerator archiveTask={archiveTask} />} />
        <Route path='/archive' element={<Archive archiveTasks={archiveTasks}/>} />

      </Routes>
    </div>
  );
}

export default App;

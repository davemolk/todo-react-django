import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'

import AddTask from './components/AddTask'
import Header from './components/Header'
import Tasks from './components/Tasks'
import Footer from './components/Footer'
import About from './components/About'


function App() {
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const title = "Tracker"

  const fetchTasks = async () => {
    const res = await fetch('/api/todos/')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`/api/todos/${id}`)
    const data = await res.json()
    return data
  }


  const onAdd = () => {
    setShowAddTask(!showAddTask)
  }


  const addTask = async (task) => {
    const res = await fetch('/api/todos/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id!==id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()
    
    setTasks(tasks.map(task => (
      task.id === id ?
      {...task, reminder: !data.reminder} :
      task
    )))
  }

  return (
    <Router>
    <div className="container">
      <Header title={title} onAdd={onAdd} showAdd={showAddTask} />
      <Route 
          path='/' exact 
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              { tasks.length > 0 
                ? <Tasks tasks={tasks} onDelete={deleteTask} onDoubleClick={toggleReminder} /> 
                : 'You Have No Tasks!'}
            </>
        )}/>
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>  
  );
}

export default App;

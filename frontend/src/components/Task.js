import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onDoubleClick }) => {
    return (
        <div className={`task ${task.completed ?
            'reminder' : ''}`}
            onDoubleClick={() => onDoubleClick(task.id)}
            >
            <h3>{task.title} <FaTimes 
                style={{color: 'red', cursor: 'pointer'}} 
                onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.description}</p>
        </div>
    )
}

export default Task

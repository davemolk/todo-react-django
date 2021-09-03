import Task from './Task'

const Tasks = ({ tasks, onDelete, onDoubleClick }) => {
    return (
        <div>
            {tasks.map(task => (
                <Task key={task.id} task={task} onDelete={onDelete} onDoubleClick={onDoubleClick} />
            ))}
        </div>
    )
}

export default Tasks

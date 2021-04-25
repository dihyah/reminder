import Task from './Task'

const List = ({ list, onDelete, onToggle }) => {

    return (
        //setList([...list, {}])
        <>
            {list.map((task, index) => (
                <Task 
                    key={index}
                    task={task} 
                    onDelete={onDelete} 
                    onToggle={onToggle} 
                />
            ))}
        </>
    )
}

export default List

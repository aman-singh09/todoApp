import {useState} from "react"
import TodoList from "../components/TodoList"
import { stateArray,initialState } from "../constants/todoConstants"

export default function OptimisedTodo(){
    const [currentTodoItem, setCurrentTodoItem] = useState('')
    const [todoList,setTodoList] = useState([])

    const addNewItem =()=>{
        const newTodoItem = {
            id: Date.now(),
            name: currentTodoItem,
            state: initialState
        }
        setTodoList([...todoList,newTodoItem])
        setCurrentTodoItem('')
    }

    const addItemTo = (item,toState) =>{
        const updatedTodoItem = {...item, state: toState}
        const updatedTodoList= [...removeItem(item), updatedTodoItem]
        setTodoList(updatedTodoList)
    }

    const removeItem= (todoItem) => todoList.filter(todo => todo.id!== todoItem.id)

    const getTodoItems = (state) =>todoList.filter(todo => todo.state === state);

    const getButton = (todo, button) => <button onClick={()=> addItemTo(todo,button)}> {button}</button>
    return(
        <>
            <input type='text' onChange={(e) => setCurrentTodoItem(e.target.value)} value={currentTodoItem}/>
            <button type="button"  onClick={addNewItem} > Add Todo </button>
            {stateArray.map(state=> <TodoList stateName={state} getTodoItems={getTodoItems} addItemTo= {addItemTo} getButton={getButton}/>)}
        </>
    )
}
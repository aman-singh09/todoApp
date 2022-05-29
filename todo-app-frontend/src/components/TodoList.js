import { stateArray } from "../constants/todoConstants"

export default function TodoList(props){
    const buttonsArray = stateArray.filter(state => state !== props.stateName)
    return(<>
    <h3>{props.stateName}</h3>
        <ol>
            {props.getTodoItems(props.stateName).map(todo => {
                return(<li>
                    { todo.name }{' '} 
                    {buttonsArray.map((button) => props.getButton(todo,button))}
                    </li>
                )
            })}
        </ol>
    </>

    )
}
import React, {useState, useEffect} from "react"
import axios from 'axios'
import '../App.css'

export default function Todo(){
    const [formData, setFormData] = useState("")
    const [pending, setPending] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [completed, setCompleted] = useState([])

    const [data, setData] = useState([])
    
    const handleInputBox = (event) =>{
        setFormData(event.target.value)
    }

    const addInPending = () =>{
        setPending([...pending,formData])
        setFormData('')
    }

    const Operations= (index,setSource,setDestination,source,destination) =>{
        const Item= source[index]
        setDestination([...destination,Item])
        const fiteredTodos= source.filter(
            (_,itr) => index!== itr
        )
        setSource(fiteredTodos)
    }
    
    useEffect(()=>{
        axios.get('http://localhost:5000/todos/getTodos')
        .then(response => {
            setData(response.data.body.todos)
        })
    },[])
    console.log(data)
    return(
    <>
        <div className="form">
            <label>
                <input type='text' name="todoName" onChange={handleInputBox}/>
                <button onClick={addInPending}>Add Todo</button> <br/>
                <br/>
            </label>
        </div>
        <div className="status">
            <div className="pending">
                <h2>Pending</h2>
                {
                    pending.map((item,index)=>{
                        return(
                            <div>
                                <p>{index+1}. {item}</p>
                                <button onClick={()=> Operations(index,setPending,setInProgress,pending,inProgress)}> InProgress</button>
                                <button onClick={()=> Operations(index,setPending,setCompleted,pending,completed)}> Completed</button>
                            </div>
                        )
                    }
                )}
            </div>
            <div className="inProgress">
                <h2>InProgress</h2>
                {
                    inProgress.map((item,index)=>{
                        return(
                            <div>
                                <p>{index+1}. {item}</p>
                                <button onClick={()=> Operations(index,setInProgress,setPending,inProgress,pending)}> Pending</button>
                                <button onClick={()=> Operations(index,setInProgress,setCompleted,inProgress,completed)}> Completed</button>
                            </div>
                        )
                    }
                )}
            </div>
            <div className="Completed">
                <h2>Completed</h2>
                {
                    completed.map((item,index)=>{
                        return(
                            <div>
                                <p>{index+1}. {item}</p>
                                <button onClick={()=> Operations(index,setCompleted,setPending,completed,pending)}> Pending</button>
                                <button onClick={()=> Operations(index,setCompleted,setInProgress,completed,inProgress)}> InProgress</button>
                            </div>
                        )
                    }
                )}
            </div>
            
        </div>
        <div>
            {
                data.map((item,index) => {
                    return(
                    <p> {index+1} {item.title} </p>
                )})
            }
        </div>
        
    </>)
}

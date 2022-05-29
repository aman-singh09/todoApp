import React, {useState, useEffect} from "react"
import axios from 'axios'
import '../App.css'
import qs from 'qs'

export default function Todo(){
    const [formData, setFormData] = useState("")
    // const [pending, setPending] = useState([])
    // const [inProgress, setInProgress] = useState([])
    // const [completed, setCompleted] = useState([])

    const [data, setData] = useState([])
    
    const getData = () =>{
        axios.get('http://localhost:5000/todos/getTodos')
        .then(response => {
            setData(response.data.body.todos)
        })
    }

    const addInPending = () =>{
        const payload = qs.stringify({ 'title': formData , status: "pending"});
        axios.post('http://localhost:5000/todos/addTodo', payload)
        .then(response => {
            getData()
        });
        setFormData('')
    }

    const changeStatus = (id,status) =>{
        axios.post('http://localhost:5000/todos/changeStatus', qs.stringify({todoId: id, status: status }))
        .then(response =>{
            getData()
        })
    }
    
    useEffect(()=>{
        getData()
    },[])

    return(
    <>
        <div className="form">
            <label>
                <input type='text' name="todoName" onChange={(e) => setFormData(e.target.value)}/>
                <button onClick={addInPending}>Add Todo</button> <br/>
                <br/>
            </label>
        </div>
        <div className="status">
            <div className="pending">
                <h2>Pending</h2>
                {
                    data.filter(item =>item.status === "pending").map((filtereditem,index) =>{
                        return (
                        <div>
                            <p>{index+1}{'.'} {filtereditem.title} </p>
                            <button onClick={() => changeStatus(filtereditem._id,'inProgress')}> InProgress</button>
                            <button onClick={() => changeStatus(filtereditem._id,'completed')}> Completed</button>
                        </div>
                    )})
                }
                
            </div>
            <div className="inProgress">
                <h2>InProgress</h2>
                {
                    data.filter(item =>item.status === "inProgress").map((filtereditem,index) =>{
                        return (
                            <div>
                                <p>{index+1}{'.'} {filtereditem.title} </p>
                                <button onClick={() => changeStatus(filtereditem._id,'pending')}> Pending</button>
                                <button onClick={() => changeStatus(filtereditem._id,'completed')}> Completed</button>
                            </div>
                        )})
                }
            </div>
            <div className="Completed">
                <h2>Completed</h2>
                {
                    data.filter(item =>item.status === "completed").map((filtereditem,index) =>{
                        return (
                            <div>
                                <p>{index+1}{'.'} {filtereditem.title} </p>
                                <button onClick={() => changeStatus(filtereditem._id,'pending')}> Pending</button>
                                <button onClick={() => changeStatus(filtereditem._id,'inProgress')}> InProgress</button>
                            </div>
                        )
                    })
                }
            </div>  
        </div>
    </>)
}
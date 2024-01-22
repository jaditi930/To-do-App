import { FC,useEffect, useState,Dispatch,SetStateAction } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface Task{
    username:string,
    _id:string,
    desc:string,
    status:string
}


const AllTasks:FC<{token:string,tasks:Array<Task>,setTasks:Dispatch<SetStateAction<Array<Task>>>}>=(props)=>{

    const [completed,setCompleted]=useState<Array<boolean>>([])

    function handleCheckBox(e:React.ChangeEvent<HTMLInputElement>,i:number,id:string){

        setCompleted([...completed.slice(0, i),e.target.checked,
            ...completed.slice(i + 1)]);

    fetch(`http://localhost:5000/api/todo/update/${id}`,{
        method:"PUT",
        credentials:"include",
            headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${props.token}`,
          }
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    .catch((e)=>console.log("error"))
    
    }

    function handleDelete(e:React.MouseEvent<HTMLButtonElement>,i:number,id:string){
        console.log(id)

        props.setTasks([...props.tasks.slice(0, i),
            ...props.tasks.slice(i + 1)]);


        fetch(`http://localhost:5000/api/todo/delete/${id}`,{
            method:"DELETE",
            credentials:"include",
            headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${props.token}`,
          }
        })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    .catch((e)=>console.log(e.message))
    
    }

    useEffect(()=>{
        fetch("http://localhost:5000/api/todo/viewAllTasks",{
            credentials:"include",
            headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${props.token}`,
          }
        },)
        .then((response)=>response.json())
        .then((data)=>{
            let completed_Array:Array<boolean>=[]
            props.setTasks(data.tasks)
            let all_tasks=data.tasks;
            for(let i=0;i<all_tasks.length;i++){
                if(all_tasks[i].status == "Incomplete")
                completed_Array.push(false)
                else
                completed_Array.push(true)
            }
            setCompleted(completed_Array)
        })
    },[])

    const task_rows=props.tasks.map((task,index)=>{

        return (
      <tr>
      <th scope="row">{index}</th>
      <td>{task.desc}</td>
      <td><input type="checkbox" checked={completed[index]} disabled={completed[index]} onChange={(e)=>handleCheckBox(e,index,task._id)}/></td>
      <td><button className="btn btn-primary" onClick={(e)=>handleDelete(e,index,task._id)}>Delete</button></td>
    </tr>
        )
    })
    return (
        <>
    <table className="table table-primary table-striped">
  <thead>
    <tr>
      <th scope="col">S.NO</th>
      <th scope="col">Task</th>
      <th scope="col">Completed</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>

    {task_rows}

  </tbody>
</table>
        </>
    )
}
export default AllTasks;
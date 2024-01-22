import { FC,useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface Task{
    id:string,
    desc:string,
    status:string
}

const AllTasks:FC<{token:string}>=()=>{

    const [tasks,setTasks]=useState<Array<Task>>([])
    const [completed,setCompleted]=useState<Array<boolean>>([])

    function handleCheckBox(e:React.ChangeEvent<HTMLInputElement>,i:number,id:string){

        setCompleted([...completed.slice(0, i),e.target.checked,
            ...completed.slice(i + 1)]);

    fetch(`http://localhost:5000/api/todo/updateTask/${id}`)
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    .catch((e)=>console.log(e))
    
    }

    function handleDelete(e:React.MouseEvent<HTMLButtonElement>,i:number,id:string){

        setTasks([...tasks.slice(0, i),
            ...tasks.slice(i + 1)]);


        fetch(`http://localhost:5000/api/todo/deleteTask/${id}`)
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    .catch((e)=>console.log(e))
    
    }

    useEffect(()=>{
        fetch("http://localhost:5000/api/todo/viewAllTasks")
        .then((response)=>response.json())
        .then((data)=>{
            let completed_Array:Array<boolean>=[]
            setTasks(data.tasks)
            for(let i in data.tasks){
                if(data.tasks.status=="Incomplete")
            completed_Array.push(false)
                else
                completed_Array.push(true)
            }
            setCompleted(completed_Array)
        })
    },[])

    const task_rows=tasks.map((task,index)=>{

        return (
      <tr>
      <th scope="row">{index}</th>
      <td>{task.desc}</td>
      <td><input type="checkbox" checked={completed[index]} onChange={(e)=>handleCheckBox(e,index,task.id)}/></td>
      <td><button className="btn btn-primary" onClick={(e)=>handleDelete(e,index,task.id)}>Delete</button></td>
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
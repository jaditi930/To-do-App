import { FC,useEffect, useState,Dispatch,SetStateAction } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface Task{
    username:string,
    _id:string,
    desc:string,
    isCompleted:boolean
}

interface TaskProps{
  token:string,
    tasks:Array<Task>,
    setTasks:Dispatch<SetStateAction<Array<Task>>>,
    setAlertMsg:Dispatch<SetStateAction<string>>,

}


const AllTasks:FC<TaskProps>=(props)=>{


    function handleCheckBox(e:React.ChangeEvent<HTMLInputElement>,i:number,id:string){
        let taskToUpdate:Task|undefined=props.tasks.find((task)=>task._id==id)
        if(taskToUpdate === undefined) 
        return;
        taskToUpdate.isCompleted=e.target.checked
        console.log(taskToUpdate)
        props.setTasks([...props.tasks.slice(0, i),taskToUpdate,
            ...props.tasks.slice(i + 1)]);

    fetch(`http://localhost:5000/api/todo/update/${id}/${taskToUpdate.isCompleted}`,{
        method:"PUT",
        credentials:"include",
            headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json',
          }
    })
    .then((response)=>response.json())
    .then((data)=>
      props.setAlertMsg("")
  )}

    function handleDelete(e:React.MouseEvent<HTMLButtonElement>,i:number,id:string){
        console.log(id)

        props.setTasks([...props.tasks.slice(0, i),
            ...props.tasks.slice(i + 1)]);



        fetch(`http://localhost:5000/api/todo/delete/${id}`,{
            method:"DELETE",
            credentials:"include",
            headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json',
          }
        })
    .then((response)=>response.json())
    .then((data)=>
      props.setAlertMsg("")
    )}

    useEffect(()=>{
        fetch("http://localhost:5000/api/todo/viewAllTasks",{
            credentials:"include",
            headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json',

          }
        },)
        .then((response)=>response.json())
        .then((data:any)=>{
            props.setTasks(data.tasks)
            props.setAlertMsg("")
        })

    },[])

    const task_rows=props.tasks.map((task,index)=>{

        return (
      <tr key={task._id}>
      <th scope="row">{index+1}</th>
      <td>{task.desc}</td>
      <td><input type="checkbox" checked={task.isCompleted} onChange={(e)=>handleCheckBox(e,index,task._id)}/></td>
      <td><button className="btn btn-primary" onClick={(e)=>handleDelete(e,index,task._id)}>Delete</button></td>
    </tr>
        )
    })
    return (
        <>
    <h1 className="text-4xl text-center">My Tasks</h1>
    <table className="table table-striped">
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
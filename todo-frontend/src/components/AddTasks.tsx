import { FC,useState,Dispatch,SetStateAction } from 'react';

interface Task{
  username:string,
  _id:string,
  desc:string,
  status:string
}


const AddTasks:FC<{token:string,tasks:Array<Task>,setTasks:Dispatch<SetStateAction<Array<Task>>>}>=(props)=>{
    const [desc,setdesc]=useState<string>("");
    return (
        <>
        <div className="flex items-center justify-center p-5">
    <div className="flex">
      <input type="text" className="min-w-[460px] bg-gray-100 pl-2 text-base font-semibold outline-0" placeholder="" id=""
      value={desc}
      onChange={
        (e:React.ChangeEvent<HTMLInputElement>)=>setdesc(e.target.value)
        }
      />
      <input type="button" value="Add task" className="min-w-[60px] bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
      onClick={(e)=>{
        e.preventDefault();
        fetch("http://localhost:5000/api/todo/add",{
            method:"POST",
            credentials:"include",
            headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${props.token}`,
          },
            body:JSON.stringify({
                "desc":desc
            })
        })
        .then((response)=>response.json())
        .then((data)=>{
            props.setTasks([...props.tasks,data])
        })
        .catch((err)=>{
            console.log("error")
        })
        
      }}/>
    </div>
  </div>
        </>
    )
}
export default AddTasks;
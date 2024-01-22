import { FC,useState } from "react";
import AddTasks from "./AddTasks"
import AllTasks from "./AllTasks"

interface Task{
    username:string,
    _id:string,
    desc:string,
    status:string
}



const Home:FC<{token:string}>=(props)=>{
    const [tasks,setTasks]=useState<Array<Task>>([])
    
    return (
        <>
        <AddTasks token={props.token} tasks={tasks} setTasks={setTasks}/>
        <AllTasks token={props.token} tasks={tasks} setTasks={setTasks}/>
        </>

    )
}

export default Home;
import { FC,useState,Dispatch,SetStateAction } from "react";
import AddTasks from "./AddTasks"
import AllTasks from "./AllTasks"
import NavBar from "./NavBar"


interface Task{
    username:string,
    _id:string,
    desc:string,
    status:string
}

interface HomeProps{
    token:string,
    setAlertMsg:Dispatch<SetStateAction<string>>,
    
}


const Home:FC<HomeProps>=(props)=>{
    const [tasks,setTasks]=useState<Array<Task>>([])
    
    return (
        <>
        <NavBar/>
        <AddTasks token={props.token} tasks={tasks} setTasks={setTasks} setAlertMsg={props.setAlertMsg}/>
        <AllTasks token={props.token} tasks={tasks} setTasks={setTasks} setAlertMsg={props.setAlertMsg}/>
        </>

    )
}

export default Home;
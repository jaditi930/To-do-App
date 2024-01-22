import { FC } from "react";
import AddTasks from "./AddTasks"
import AllTasks from "./AllTasks"

const Home:FC<{token:string}>=(props)=>{
    return (
        <>
        <AddTasks token={props.token}/>
        <AllTasks token={props.token}/>
        </>

    )
}

export default Home;
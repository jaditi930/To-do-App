import { FC,useState } from "react"
import {useNavigate} from "react-router"
import { Link } from "react-router-dom"

const SignUp:FC=()=>{
    const [username,setUsername]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const navigate=useNavigate()

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        fetch("http://localhost:5000/api/user/signup",{
          method:"POST",
          body:JSON.stringify({
            "username":username,
            "password":password
          })
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            navigate("/login")
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    return (
        <div className="flex justify-center">
    <form className="form" onSubmit={(e)=>handleSubmit(e)}>

        <p className="text-3xl text-center font-bold p-3">Welcome to ToDo App</p>
        <p className="text-center p-1">Your go-to task manager</p>

       <p className="form-title p-1 text-2xl">Create a new account</p>
        <div className="input-container">
          <input placeholder="Enter username" type="text" onChange = { (e:React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value) }/>
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
            </svg>
          </span>
      </div>
      <div className="input-container">
          <input placeholder="Enter password" type="password" onChange = { (e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value) }/>

          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
            </svg>
          </span>
        </div>
         <button className="submit" type="submit" >
        Sign Up
      </button>

      <p className="signup-link">
        Already have an account?
        <Link to="/login">Log in</Link>
      </p>
   </form>

        </div>
    )
}
export default SignUp;
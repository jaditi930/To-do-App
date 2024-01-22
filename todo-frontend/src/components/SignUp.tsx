import { FC,useState,Dispatch,SetStateAction } from "react"
import {useNavigate} from "react-router"
import { Link } from "react-router-dom"

interface SignUpProps{
  setAlertMsg:Dispatch<SetStateAction<string>>

}

const SignUp:FC<SignUpProps>=(props)=>{
    const [username,setUsername]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const navigate=useNavigate()

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()
        fetch("http://localhost:5000/api/user/signup",{
          method:"POST",
          body:JSON.stringify({
            "username":username,
            "password":password
          }),
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })
        .then((response)=>response.json())
        .then((data:any)=>{
          if(data.success){
            navigate("/")
          props.setAlertMsg("")
          }
          else
          props.setAlertMsg(data.message)
        })
    }
    return (
        <div className="flex justify-center h-100">
    <form className="form" onSubmit={(e)=>handleSubmit(e)}>

        <p className="text-3xl text-center font-bold p-3">Welcome to ToDo App</p>
        <p className="text-center p-1">Your go-to task manager</p>

       <p className="form-title p-1 text-2xl">Create a new account</p>
        <div className="input-container">
          <input placeholder="Enter username" type="text" onChange = { (e:React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value) }/>
      </div>
      <div className="input-container">
          <input placeholder="Enter password" type="password" onChange = { (e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value) }/>
        </div>
         <button className="submit" type="submit" >
        Sign Up
      </button>

      <p className="signup-link">
        Already have an account?
        <Link to="/">Log in</Link>
      </p>
   </form>

        </div>
    )
}
export default SignUp;
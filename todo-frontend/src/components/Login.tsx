import { AnyRecord } from "dns"
import { FC,useState,Dispatch, SetStateAction } from "react"
import {Link,useNavigate} from "react-router-dom"

interface LoginProps{
    setToken: Dispatch<SetStateAction<string>>,
    setAlertMsg:Dispatch<SetStateAction<string>>,
}

const Login:FC<LoginProps> = (props) => {
    const [username,setUsername]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const navigate=useNavigate()

        function handleSubmit(e:React.FormEvent<HTMLFormElement>){
          e.preventDefault()
          console.log(username,password)
        fetch("http://localhost:5000/api/user/login",{
          method:"POST",
          credentials:"include",
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body:JSON.stringify({
            "username":username,
            "password":password
          })
        })
        .then((response)=>response.json())
        .then((data)=>{
           if(data.token)
           {
            console.log(data.token)
            props.setToken(data.token)
            localStorage.setItem("token",data.token)
            navigate("/home")
            props.setAlertMsg("")
           }
           else{
            props.setAlertMsg(data.message)
           }
        })
    }

    return (
        <div className="flex justify-center h-100 ">
        
    <form className="form" onSubmit={(e)=>handleSubmit(e)}>

    <p className="text-3xl text-center font-bold p-3">Welcome to ToDo App</p>
    <p className="text-center p-1">Your go-to task manager</p>

       <p className="form-title p-1 text-2xl">Log in to your account</p>
        <div className="input-container">
          <input placeholder="Enter username" type="text" onChange={ (e:React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value) }/>
      </div>
      <div className="input-container">
          <input placeholder="Enter password" type="password" onChange={ (e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value) }/>
        </div>
         <button className="submit" type="submit" >
        Log in
      </button>

      <p className="signup-link">
        Don't have an account ?
        <Link to="/signup">Sign Up</Link>
      </p>
   </form>

        </div>
    )
}
export default Login;
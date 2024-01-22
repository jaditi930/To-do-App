import { FC } from "react";
import {useNavigate } from "react-router-dom";

const NavBar:FC=()=>{
    const navigate=useNavigate()
    return (

        <ul className="flex mb-5 p-1 bg-blue-500 text-white">
                <li className="p-2">ToDo</li>
                <li className="ml-auto p-2 cursor-pointer text-decoration-none color-white" onClick={(e)=>{
                    localStorage.removeItem("token")
                    navigate("/")
                }}>Logout</li>
               
            </ul>
    )
}
export default NavBar;
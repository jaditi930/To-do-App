import { FC } from "react";
import { Link } from "react-router-dom";

const NavBar:FC<{token:string}>=(props)=>{
    return (

        <ul className="flex mb-5 p-1 bg-blue-500 text-white">
                <li className="p-2">ToDo</li>
                { props.token !="" ? (
                <li className="ml-auto p-2"><Link to="/logout">Logout</Link></li>
                ): (
                <>
                <li className="ml-auto p-2"><Link to="/login">Login</Link></li>
                <li className="p-2"><Link to="/signup">SignUp</Link></li>
                </>
                )}
            </ul>
    )
}
export default NavBar;
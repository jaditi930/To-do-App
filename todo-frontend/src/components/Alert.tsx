import { FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Alert:FC<{message:string}>=(props)=>{
    console.log(props.message)
    return (
        <>
        { props.message!=""  ? (
        <div className="alert alert-danger">{props.message}</div>
        ):(
            <></>
        )}
        </>
    )
}

export default Alert;
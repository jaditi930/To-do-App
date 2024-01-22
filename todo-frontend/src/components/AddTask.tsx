import { FC,useState } from 'react';

const AddTasks:FC=()=>{
    const [desc,setdesc]=useState<string>();
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
            body:JSON.stringify({
                "desc":desc
            })
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
        })
        .catch((e)=>{
            console.log(e)
        })
        
      }}/>
    </div>
  </div>
        </>
    )
}
export default AddTasks;
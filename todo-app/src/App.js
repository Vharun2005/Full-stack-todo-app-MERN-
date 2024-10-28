import { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import apirequest from "./apirequest";





function App() {
  const URL = "http://localhost:3500/tasks/"
  const inputref = useRef(null)
  const [inputVal,setInputVal] = useState('')
  const [getid,setgetid] = useState(0)
  const [editpost,setEditpost] = useState('')
  const [editOnoff,setEditonoff] = useState(false)
  const [items,Setitems] = useState([

  ])
  useEffect(()=>{
    const fetchFunction = async()=>{
      try{
      const response = await fetch(URL)
      if(!response.ok){
        throw Error('data not recived or ensure internet connection')
      }
      const result = await response.json()
      console.log(result)
      Setitems(result)
      }catch(err){
        console.log(err)
      }
    }
    fetchFunction()
  },[])


  const addFunction = async(item)=>{
    const checkInput = inputVal
    if(!checkInput){
      return alert('please enter the task')
    }
    const id = items.length ? items[items.length -1].id + 1 : 1;
    const newobj = {id:id,checked:false,task:inputVal};
    const sendobj = [newobj]
    console.log(JSON.stringify(sendobj))
    const newArr = [...items,newobj];
    Setitems(newArr)
    setInputVal('')
    const options = {
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({id:id,task:inputVal,checked:false})
    }
    const result = await apirequest(URL,options)
      if(result){
        console.log(result)
      }
  }
  const handleCheck = async(id) => {
    const newarr = items.map((item)=>(
      item.id === id ? {...item,checked:!item.checked} : item
    ))
    Setitems(newarr)
    const newObj = newarr.find((item)=>(
      item.id === id
    ))
    const options = {
      method:'PATCH',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newObj)
    }
    const result = await apirequest(URL,options)
    if(result){
      console.log(result)
    }
  }
  const handleDelete = async(id) => {
    const newarr = items.filter((item)=> item.id !== id)
    
    const twonewArr = items.find((item)=> item.id === id)
    Setitems(newarr)
    const options = {
      method:'DELETE',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(twonewArr)
    }
    const result = await apirequest(URL,options)
    if(result){
      console.log(result)
    }
  }
  
  
  const handleEdit = (id)=>{
    const recievedObj = items.find((item) => item.id === id)
    setEditpost(recievedObj.task)
    setgetid(id)
    setEditonoff(true)

  }
  const handleEditTwo = async(message)=>{

    const newArr = items.map((item)=>(
      item.id === getid ? {...item,task:message}:item
    ))
    const newObj = newArr.find((item)=>item.id === getid)
    Setitems(newArr)
    setEditonoff(false)
    setEditpost('')
    setgetid(0)
    const options = {
      method:'PUT',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newObj)
    }
    const result = await apirequest(URL,options)
    if(result){
      console.log(result)
    }

  }
  useEffect(()=>{
    if(editOnoff && inputref.current){
      inputref.current.focus()
    }
  } ,[editOnoff])
  
  return (
    <div>
      <section className="container media text-center mt-4 w-auto border  border-black rounded">
        <div>
          <p className="text-center fs-2 fw-medium ">Todo App</p>
        </div>
        <div>
          {editOnoff &&
            <>
            <div className="d-flex justify-content-center">
             <div>
             <input
              ref={inputref}
              value={editpost}
              onChange={(e)=> setEditpost(e.target.value)}
              className="inputbox   mt-3 mb-3 text-center fw-medium"
              ></input>
              </div>
              <div>
              <button className="mt-4 ms-2" onClick={()=>handleEditTwo(editpost)}>Edit</button>
              </div>
             </div>
            </>
          }
          {!editOnoff &&
            <>
            <div>

            </div>
            </>
            

          }
        </div>
        <div className="d-flex  justify-content-center ">
            <div>
              <input
              required
              placeholder="New Task"
              value={inputVal}
              onChange={(e)=> setInputVal(e.target.value)}
              className="inputbox   mt-3 mb-3 text-center fw-medium"
              ></input>
              </div>
              <div>
              <button className="mt-4 ms-2" onClick={()=>addFunction(inputVal)}><IoMdAdd className="fs-2 fw-medium  cursor"/></button>
              </div>
        </div>  
        <div className="container  mt-4">
          <section>
              
                <ul className="">
                  {
                    items.length ? 
                    items.map((item)=>{
                      return(
                        <li className="mt-4 d-flex  list-bo" key={item.id}>
                          <input type="checkbox" className="check-box cursor mt-2"  onClick={()=>handleCheck(item.id)} checked={item.checked}></input>
                          <p className="li-p border p-2 border-info">{item.task}</p>
                          <FiEdit className=" ms-2 mt-3 fs-2 fw-medium  cursor" onClick={()=>handleEdit(item.id)} />
                          <FaTrashAlt className=" ms-2 mt-3 fs-2 fw-medium text-danger cursor" onClick={()=>handleDelete(item.id)}/>
                        </li>
                      )
                    }):<p>task is empty</p>
                  }
                </ul>
                
              
            

          </section>

        </div>  
        

      </section>
    </div>
  );
}

export default App;

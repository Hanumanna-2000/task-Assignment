import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GetAlltask = () => {
    let [tasks,setTasks]=useState([])
    let [deleteid,setDeleteid]=useState("")
    let navigate=useNavigate()
    let getAlltaks=async()=>{
        try {
            let {data:{data}}= await axios.get('http://localhost:7000/api/task/gettask')
            setTasks(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getAlltaks()
    },[])
    let navigateToUpdate=(id)=>{
        navigate(`/updatetask/${id}`)
    }
    let navigateTODelete=async(id)=>{
        
        let res=await axios.delete(`http://localhost:7000/api/task/deletetask/${id}`,{
            headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            })
            let {data:{data}}= await axios.get('http://localhost:7000/api/task/gettask')
            setTasks(data)
          console.log(res)
          navigate('/getalltask')
    }
    let navigateBack=()=>{
        navigate('/dashboard')
    }
  return (
    <section>
        <button onClick={navigateBack} > back</button>
        <table  cellPadding={10} cellSpacing={10} >
            <thead>
                <tr>
                    <th>TaskName</th>
                    <th>update</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(({taskname,_id})=>{
                        return <> <tr>
                            <td>{taskname} </td>
                            <td><button  onClick={()=>(navigateToUpdate(_id))} >update</button></td>
                            <td><button onClick={(e)=>navigateTODelete(_id)} >delete</button></td>
                            </tr>  </>
                    })
                }
            </tbody>
        </table>
    </section>
  )
}

export default GetAlltask
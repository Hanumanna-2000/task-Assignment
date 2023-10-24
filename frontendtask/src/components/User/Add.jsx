

import React, { useState } from 'react'

const Add = () => {
  let [value1,setValue1]=useState(0)
  // let [value2,setValue2]=useState(true)
  let [sum1,setSum]=useState(0)
  let inputChange1=({target:{value}})=>{
    setValue1(value)
}
let inputChange2=({target:{value}})=>{
  setValue1(value)
}
let sum=()=>{
// setSum(value1+value2)
}
  return (
    <div>
      <input type="text" onChange={inputChange1} />
      <input type="text" onChange={inputChange2}  />
      <h4>{sum}</h4>
      <button  onClick={sum} >add</button>
    </div>
  )
}

export default Add
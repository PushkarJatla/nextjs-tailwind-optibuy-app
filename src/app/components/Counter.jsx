"use client"
import React, { useState } from 'react'

const Counter = () => {
    const[count,setCount] = useState(0);

    const incrementCount = () => {
        setCount(count => count+1)
    }
     const decrementCount = () => {
        setCount(count => count-1)
    }

  return (
    <div>
      <h1>Count : {count}</h1>
      <button onClick={()=>incrementCount()}>Increase</button>
      <button onClick={()=>decrementCount()}>Decrease</button>
    </div>
  )
}

export default Counter

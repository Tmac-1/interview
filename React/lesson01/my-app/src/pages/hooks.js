import React, { useState, useEffect } from 'react';

export default function Demo() {
    const [n,setN] = useState(1)
    useEffect(()=>{
        console.log('a',n)
        return ()=>{
            console.log('b',n)
        }
    })
    // 进入时候打印 a=1，每次点击时候 b=1 a=2
     return (
         <div onClick={()=>{setN(n+1)}}>test</div>
    //    <div onClick={()=>{setN(n+1)}}>test</div>
     )
}
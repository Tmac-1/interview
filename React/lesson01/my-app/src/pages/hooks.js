import React, { useState, useEffect, useMemo } from 'react';

export  function Demo() {
    const [n,setN] = useState(1)
    // useEffect(()=>{
    //     console.log('a',n)
    //     return ()=>{
    //         console.log('b',n)
    //     }
    // })
    // 进入时候打印 a=1，每次点击时候 b=1 a=2
     return (
         <div onClick={()=>{setN(n+1)}}>test</div>
    //    <div onClick={()=>{setN(n+1)}}>test</div>
     )
}

export const DemoState = (props) => {
    /* number为此时state读取值 ，setNumber为派发更新的函数 */
    let [number, setNumber] = useState(0) /* 0为初始值 */
    // console.log('number',number)
    return (<div>
        <span>{ number }</span>
        <button onClick={ ()=> {
          setNumber(number+1)
          console.log('点击',number) /* 这里的number是不能够即使改变的  */
        } } >点我</button>
    </div>)
 }
 
 const a =1 
 export const DemoState2 = (props) => {
    /*  useState 第一个参数如果是函数 则处理复杂的逻辑 ，返回值为初始值 */
    let [number, setNumber] = useState(()=>{
       // number
       return a===1 ? 1 : 2
    }) /* 1为初始值 */
    return (<div>
        <span>{ number }</span>
        <button onClick={ ()=>setNumber(number+1) } >点我2</button>
    </div>)
 }

 export const DemoUseMemo=()=>{
    const [ number ,setNumber ] = useState(0)
    const newLog = useMemo(()=>{
        const log =()=>{
            /* 点击span之后 打印出来的number 不是实时更新的number值 */
            console.log(number)
        }
        return log
      /* [] 没有 number */  
    },[])
    return <div>
        <div onClick={()=>newLog()} >打印</div>
        <span onClick={ ()=> setNumber( number + 1 )  } >{number}增加</span>
    </div>
}


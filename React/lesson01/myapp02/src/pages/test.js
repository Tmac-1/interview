import { useState,useRef,useEffect } from 'react'




function Timer() {
    const [num,setNum] = useState(1)
    let intervalRef = useRef();
    useEffect(() => {
      const id = setInterval(() => {
        setNum(num+1)
      },1000);
      intervalRef.current = id;
      return () => {
        clearInterval(intervalRef.current);
      };
    });
    function handleCancelClick() {
        clearInterval(intervalRef.current);
    }
  
    return <div> 
           test {num} 
           <button onClick={handleCancelClick}>1111</button>
         </div>
}

export default Timer
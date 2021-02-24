import { useState,useRef,useEffect } from 'react'




// function Timer() {
//     const [num,setNum] = useState(1)
//     let intervalRef = useRef();
//     useEffect(() => {
//       const id = setInterval(() => {
//         setNum(num+1)
//       },1000);
//       intervalRef.current = id;
//       return () => {
//         clearInterval(intervalRef.current);
//       };
//     });
//     function handleCancelClick() {
//         clearInterval(intervalRef.current);
//     }
  
//     return <div> 
//            test {num} 
//            <button onClick={handleCancelClick}>1111</button>
//          </div>
// }


function MessageThread() {
  const [message, setMessage] = useState("");
  // let latestMessage = {};
  const latestMessage = useRef()

  let a = 1;
  const add = ()=>{
    a+=1
    console.log('a',a)
    // setMessage(a);
  }
  const showMessage = () => {
    console.log('message',message)
    alert("You said: " + latestMessage.current);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    latestMessage.current = e.target.value;
    console.log('------>',latestMessage)
  };

  return (
    <>
      <button style={{background:"red"}} onClick={add}>add</button>
      <button style={{background:"green"}} onClick={()=>{console.log(a)}}>console</button>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={showMessage}>Send</button>
    </>
  );
}


export default MessageThread
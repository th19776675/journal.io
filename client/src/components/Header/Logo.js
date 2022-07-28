import React, { useState, useEffect } from 'react'; 
import "./logo.css"

const Logo = () => {

  const [tabLeader, setTabLeader] = useState(".")
  
  // useEffect(() => {
  //   let timesRun = 0;
  //   function increment() {
  //     const increment = setInterval(function(){
  //       timesRun += 1;
  //       if(timesRun === 1){
  //           clearInterval(increment);
  //           timesRun = 0;
  //           decrement();
  //       }
  //       setTabLeader(tabLeader => tabLeader + ".....")
  //     }, 500); 
  //   }
  //   function decrement(){
  //     const decrement = setInterval(function(){
  //       timesRun += 1;
  //       if(timesRun === 1){
  //           clearInterval(decrement);
  //           timesRun = 0;
  //           increment();
  //       }
  //       setTabLeader(tabLeader => tabLeader.slice(0, -5))
  //     }, 500); 
  //   }
  //   increment()
  // }, [])
  
  // const [timesRun, setTimesRun] = useState(0);
  // let mouseOn = false;
  // const handleMouseEnter = () => {
  //   mouseOn = true;
  //   const increment = setInterval(function(){
  //     console.log(mouseOn)
  //     if(mouseOn === false) {
  //       clearInterval(increment);
  //     }
  //     setTabLeader(tabLeader => tabLeader + "...")
  //     if(timesRun >= 10){
  //       clearInterval(increment);
  //     }
  //     setTimesRun(timesRun => timesRun + 1)
      // console.log(timesRun)
    // }, 50); 
  // }
  // const handleMouseLeave = () => {
    // console.log(mouseOn)
    // console.log(timesRun)
    // mouseOn = false;
    // let removeTime = 0
    // const decrement = setInterval(function(){
    //   removeTime += 1;
    //     if (removeTime === timesRun) {
    //       clearInterval(decrement);
    //       setTimesRun(0);
    //       removeTime = 0;
    //     }
    //     setTabLeader(tabLeader => tabLeader.slice(0,-1))
    //   }, 50); 
  // }


  return (
    <>
      <div className="logo-container">
        <h1 className="logo-left">journ</h1>
        <h1 className="logo-centre">{tabLeader}</h1>
        <h1 className="logo-right">al</h1>
      </div>
    </>
  )
}

export default Logo;
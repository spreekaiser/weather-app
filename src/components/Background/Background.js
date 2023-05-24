import React from 'react';
import './Background.css';

export default function Background({temperature, goodWeather}){
  const temp = (() => {
    if (temperature < -5) {
      return -5
    } else if (temperature > 35) {
      return 35
    } else return temperature
  })();
  const convertedTemp = ((temp + 5) * 2.5) / 100;
  const colorTemp = `rgba(255,200,0,${convertedTemp})`
  return (
    <>
      <div 
        className="background vignette" 
        style={goodWeather ? 
          {boxShadow: '0 0 200px rgba(255,255,255,1) inset'} : 
          {boxShadow: '0 0 200px rgba(0,0,0,0.5) inset'} 
        }>
      </div>
      <div 
        className="background color" 
        style={{background: colorTemp}}>
      </div>
    </>
  )
}
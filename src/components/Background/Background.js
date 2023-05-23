import React from 'react';
import './Background.css';

export default function Background({temp}){
  let convertedTemp = ((temp + 5) * 2.5) / 100;
  // console.log(convertedTemp);
  return (
    <div className='background'>
      <div className="back first" style={{ opacity: convertedTemp }}></div>
      <div className="back second"></div>
    </div>) 
}
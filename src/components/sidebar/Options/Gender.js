import React from 'react'
import { useRef } from 'react';

const Gender = () => {
  let gender = useRef();
  return (
    <select ref={gender} name="Gender" id="Gender" defaultValue={"Gender"}>
    <option value={"-1"}>Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
    )
}


export default Gender
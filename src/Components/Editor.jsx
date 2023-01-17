import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react'
import NoteContext from '../ContextApi/NoteContext'
import { AddCircleOutline,Done,ArrowBackIos } from '@mui/icons-material';
import { Clear } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Editor() {

  const str=useContext(NoteContext);
  console.log(str)

  const titleRef=useRef();
  const descRef=useRef();
  const main=useRef();

  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [err,setErr]=useState(false);

  function titleChanger(e){
    setTitle(e.target.value);
  }
  function descChanger(e){
    setDesc(e.target.value);
  }

  function Add(){
    if (title==="" || desc===""){
      str.setErr(true);
      setErr(true);
    }
    else{
      let obj={
        id:str.state.length+1,
        title:title,
        desc:desc
      }
      str.setState([...str.state,obj])
      // Clear();
    }
  }
  function clear(){
    setTitle("");
    setDesc("");
  }
  function Save(){
    console.log("save")
    if (title!="" && desc!=""){
      for (let i=0;i<str.state.length;i++){
        if (str.edit===str.state[i].id){
          let b={
            id:str.edit,
            title:title,
            desc:desc
          }
          let a=[...str.state.slice(0,i),b,...str.state.slice(i+1)]
          console.log(a)
          str.setState(a);
        }
      }
      str.setEdit(null);
      // Clear();
      back();
    }
    else{
      setErr(true);
    }
  }

  useEffect(()=>{
    if (err){
      setTimeout(() => {
        setErr(false);
      }, 1000);
    }
  },[err])
  useEffect(()=>{
    window.localStorage.setItem("note",JSON.stringify(str.state));
  },[str.state])
  useEffect(()=>{
    console.log("hello");
    if (str.edit!==null){
      let j;
      for (let i=0;i<str.state.length;i++){
        if (str.state[i].id===str.edit){
          j=i;
          break;
        }
      }
      setTitle(str.state[j].title);
      setDesc(str.state[j].desc);
    }
  },[str.edit])

  const navigate=useNavigate();
  function back(){
    navigate("/note-app");
  }

  return (
    <div ref={main} className='w-[95%] mx-auto border border-gray-400 mt-3 h-[450px] md:h-[500px] shadow-2xl'>
      {err?
        <div className='w-full bg-red-500 text-white font-bold'>Fields Should Not Be Empty</div>
      :""}
      <div className='flex px-3 md:px-5 mt-3 justify-between'>
        <ArrowBackIos sx={{fontSize:{md:40}}} onClick={back} className='cursor-pointer'/>
        <input type="text" ref={titleRef} value={title} onChange={(e)=>{titleChanger(e)}} placeholder='Title' className='outline-none text-lg md:text-2xl font-bold w-[80%] h-[20%]'/>
        <Clear onClick={(clear)} className="cursor-pointer" sx={{fontSize:{md:40}}}/>
            {str.edit===null?
              // <button onClick={Add}>Add</button>
              <AddCircleOutline onClick={()=>{Add();back()}} className="cursor-pointer" sx={{fontSize:{md:40}}}/>
            :""}
            {str.edit!==null?
              // <button onClick={Save}>Save</button>
              <Done onClick={()=>{Save();back()}} sx={{fontSize:{md:40}}} className="cursor-pointer"/>
            :""}
      </div>
        <hr className='mt-3 mb-3 w-[90%] border-black mx-auto'/>
        <textarea placeholder='Notes' ref={descRef} value={desc} onChange={(e)=>{descChanger(e)}} name="" id="" cols="30" rows="10" className='w-[95%] mx-auto outline-none h-[80%]'></textarea>
    </div>
  )
}

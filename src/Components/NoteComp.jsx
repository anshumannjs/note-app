import React from 'react'
import { useContext } from 'react'
import NoteContext from '../ContextApi/NoteContext'
import { Link } from 'react-router-dom';
import { Delete } from '@mui/icons-material';

export default function NoteComp(props) {

  const s=useContext(NoteContext);

  function handleDel(){
    let a=[];
    for (let i=0;i<s.state.length;i++){
      if (props.id!==s.state[i].id){
        a.push(s.state[i]);
      }
    }
    s.setState(a);
  }
  function handleEdit(){
    s.setEdit(props.id);
  }

  return (
    <div className='h-40 md:h-80 w-[80%] mx-auto border border-gray-400 relative rounded-lg shadow-2xl'>
        <div className='font-bold text-lg h-[10%]'>
            {props.title}
        </div>
        <Link to="/editor">
        <div className='mt-3 text-left w-[90%] mx-auto h-[75%] break-all hidden md:block' onClick={handleEdit}>
            {props.desc.slice(0,100)}
        </div>
        <div className='mt-3 text-left w-[90%] mx-auto h-[75%] break-all static md:hidden' onClick={handleEdit}>
            {props.desc.slice(0,50)}
        </div>
        </Link>
        {/* <button onClick={handleDel} className='bottom-0 right-0 absolute'>Delete</button> */}
        <div onClick={handleDel} className='bottom-0 right-0 absolute cursor-pointer'>
        <Delete ></Delete>
        </div>
    </div>
  )
}

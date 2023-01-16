import React from 'react'
import { useContext } from 'react'
import NoteContext from '../ContextApi/NoteContext'
import NoteComp from './NoteComp';
import { Link } from 'react-router-dom';
import { NoteAdd } from '@mui/icons-material';

export default function NoteList() {

  const state=useContext(NoteContext).state;
  let Cntxt=useContext(NoteContext);

  function newNote(){
    Cntxt.setEdit(null);
  }

  return (
    <div className='w-full md:w-[90%] mx-auto'>
        <div className='text-2xl font-bold'>Your Notes</div>
        <div className='grid grid-cols-2 md:grid-cols-4 mt-5 gap-y-7'>
            {state.length!==0?
                state.map((e)=>{
                    return(
                        <NoteComp key={e.id} id={e.id} title={e.title} desc={e.desc}/>
                    )
                })
            :""}
        </div>
        <Link to="/editor" className='fixed bottom-5 right-5 z-10' onClick={newNote}>
        <NoteAdd style={{height:30,width:30,zIndex:10}}></NoteAdd>
        </Link>
    </div>
  )
}

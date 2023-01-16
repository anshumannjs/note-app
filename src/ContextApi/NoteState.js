import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{

    let l=window.localStorage.getItem("note")
    l=JSON.parse(l);
    let s=[];
    if (l!=null){
        s=l;
    }

    const [state,setState]=useState(s);
    const [err,setErr]=useState(false);
    const [edit,setEdit]=useState(null);

    return(
        <NoteContext.Provider value={{state,setState,err,setErr,edit,setEdit}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
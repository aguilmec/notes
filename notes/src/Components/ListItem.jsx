import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function ListItem({ item, showEdit, handleDelete }){

    return(
        <div className="bg-white shadow-md rounded-sm px-[15px] py-[10px] grid grid-cols-10">
            <p className="text-left tracking-wide cursor-default text-[16px] text-slate-800 col-span-9">{item}</p>
            {showEdit && <button onClick={()=>{handleDelete(item)}} className="text-red-600 col-span-1 ml-auto"><MdDeleteOutline /></button>}
        </div>
    );
}
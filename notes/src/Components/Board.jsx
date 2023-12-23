import { useEffect, useState } from "react";
import NoteList from "./NoteList";
import NewListModal from "./NewListModal";

export default function Board({ board }){

   const [lists, setLists] = useState([]);
   const [isOpen, setIsOpen] = useState(false);

   function handleNewList(name){
    setLists([...lists,{name:[]}])
   };

   function handleClose(){
    setIsOpen(!isOpen);
   };

   useEffect(()=>{
    if(board && board.listItems){
        setLists(board.listItems);
    }
   }, [board]);

    return(
        <div className="w-screen h-fit flex flex-col ">
            <div className="ml-[25px] flex flex-col text-left">
                <p className="text-slate-300 text-4xl tracking-wide cursor-default">{board.name}</p>
                <p className="text-slate-500 text-xl tracking-wide cursor-default">Some comment about the board</p>
            </div>
            <div className="grid grid-cols-4 gap-[15px] px-[25px] mt-[90px]">
                {lists.map((list)=>{
                    return <NoteList list={list} />
                })}
            </div>
            <button onClick={()=>{setIsOpen(!isOpen)}} className="ml-auto mr-[25px] mt-[30px] bg-green-500 hover:bg-green-600 text-white px-[25px] py-[5px] w-fit">New list</button>
            {isOpen && <NewListModal handleClose={handleClose} handleNewList={handleNewList}/>}
        </div>
    );
}
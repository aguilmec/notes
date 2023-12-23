import { PiGearBold } from "react-icons/pi";
import ListItem from "./ListItem";
import { useState } from "react";
import NewItemModal from "./NewItemModal";

export default function NoteList({ list }){

    const [items, setItems] = useState(Object.values(list)[0]);
    const [isOpen, setIsOpen] = useState(false);

    function handleNewItem(item){
        setItems([...items, item]);
    };

    function handleClose(){
        setIsOpen(!isOpen);
    };

    return(
        <div className="rounded-sm flex bg-slate-300 flex-col px-[15px] py-[20px] relative min-h-[450px]">
            <div className="flex place-content-between text-xl mb-[10px]">
                <p className="my-auto cursor-default tracking-wide">{Object.keys(list)[0]}</p>
                <button className="my-auto"><PiGearBold /></button>
            </div>
            <div className="flex flex-col gap-y-[10px] mb-[20px]">
                {items.map((item)=>{
                    return <ListItem item={item} />
                })}
            </div>
            {isOpen && <NewItemModal handleNewItem={handleNewItem} handleClose={handleClose} />}
                <button onClick={()=>{setIsOpen(!isOpen)}} className="rounded-sm shadow-md mt-auto mb-[0px] text-slate-200 py-[10px] bg-emerald-400 hover:bg-emerald-500">Add new card</button>
        </div>
    );
};
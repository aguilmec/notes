import { PiGearBold } from "react-icons/pi";
import ListItem from "./ListItem";
import { useState } from "react";
import NewItemModal from "./NewItemModal";
import app from '../firebase.js';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore/lite';
import { useParams } from "react-router-dom";

export default function NoteList({ list }){

    const db = getFirestore(app);
    const { id } = useParams();

    const [items, setItems] = useState(Object.values(list)[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    async function handleNewItem(item){
        try{
            const nextState = [...items, item];
            setItems(nextState);
            const docRef = doc(db, 'boards', id);
            const snapshot = await getDoc(docRef);
            const newListItems = snapshot.data().listItems;
            let newItem = {};
            const key = Object.keys(list)[0];
            let i;
            newItem[key] = nextState
            newListItems.forEach((item, index)=>{
                if(Object.keys(item)[0] === key){
                    i = index
                }
            });
            newListItems[i] = newItem;
            await updateDoc(docRef, {
                listItems: newListItems
            });
        }catch{
            setMessage('There has been an error while performing this operation. Please try again.');
            setError(true);
            setTimeout(()=>{
                setError(false);
            },5000)
        };
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
            <div className="flex flex-col gap-y-[10px] mb-[20px] overflow-auto h-[325px]">
                {items.map((item, index)=>{
                    return <ListItem key={index} item={item} />
                })}
            </div>
            {isOpen && <NewItemModal handleNewItem={handleNewItem} handleClose={handleClose} />}
                <button onClick={()=>{setIsOpen(!isOpen)}} className="rounded-sm shadow-md mt-auto mb-[0px] text-slate-200 py-[10px] bg-emerald-400 hover:bg-emerald-500">Add new card</button>
        </div>
    );
};
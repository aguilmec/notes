import { useEffect, useState } from "react";
import NoteList from "./NoteList";
import NewListModal from "./NewListModal";
import app from "../firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore/lite";
import { useParams } from "react-router-dom";
import Toast from './Toast.jsx'

export default function Board({ board }){

    const db = getFirestore(app);
    const [lists, setLists] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    function handleNewList(name){
        let item = {};
        item[name] = [];
        const nextState = [...lists, item];
        const docRef = doc(db, 'boards', id);
        try{
            updateDoc(docRef, {
                listItems: nextState
            });
            setLists(nextState);
        }catch(error){
            setMessage('There has been an error while performing this operation. Please ty again.')
            setError(true);
            setTimeout(()=>{
                setError(false);
            },5000)
        };        
    };

    function handleClose(){
        setIsOpen(!isOpen);
    };

    useEffect(()=>{
        if(board && board.listItems){
            setLists(board.listItems);
        }else{
            setLists([]);
        }
    }, [board]);

    return(
        <div className="w-screen h-fit flex flex-col relative">
            <div className="ml-[25px] flex flex-col text-left pt-[80px] mb-[50px]">
                <p className="text-slate-300 text-4xl tracking-wide cursor-default">{board.name}</p>
                <p className="text-slate-500 text-xl tracking-wide cursor-default">Some comment about the board</p>
            </div>
            {lists.length === 0 ? <p className="text-slate-300 tracking-wide text-[18px] cursor-default mt-[80px]">This board is empty, please add a list to continue.</p>:<></>}
            <div className="grid grid-cols-4 gap-[15px] px-[25px] mt-[50px]">
                {lists.map((list, index)=>{
                    return <NoteList list={list} key={index} />
                })}
            </div>
            <button onClick={()=>{setIsOpen(!isOpen)}} className="ml-auto mr-[25px] mt-[30px] bg-green-500 hover:bg-green-600 text-white px-[25px] py-[5px] w-fit">New list</button>
            {isOpen && <NewListModal handleClose={handleClose} handleNewList={handleNewList}/>}
            {error && <Toast />}
        </div>
    );
}
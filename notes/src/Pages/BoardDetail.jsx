import app from "../firebase";
import { useEffect, useState } from "react";
import Board from "../Components/Board";
import { useParams } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore/lite';


export default function(){

    const { id } = useParams();
    const db = getFirestore(app);
    const [board, setBoard] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        async function getData(){
            const docRef = doc(db, 'boards', id);
            const docSnapshot = await getDoc(docRef);
           
            setBoard(docSnapshot.data());
        };    
        getData();
    },[]);

    return(
        <div className="w-screen relative h-full">
            {board && <Board board={board} />}
        </div>
    );
};
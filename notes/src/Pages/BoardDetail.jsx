import app from "../firebase";
import { useEffect, useState } from "react";
import Board from "../Components/Board";
import { useParams } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs, getDoc } from 'firebase/firestore/lite';
import NewItemModal from "../Components/NewItemModal";


export default function(){

    const { id } = useParams();
    const db = getFirestore(app);
    const [board, setBoard] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        async function getData(){
            const q = query(collection(db, 'boards'), where('id','==', parseInt(id) ));
            const querySnapshot = await getDocs(q);
            let data = []
            querySnapshot.forEach((doc)=>{
                data.push(doc.data());
            });   
            setBoard(data[0]);
        };    
        getData();
    },[]);

    return(
        <div className="w-screen relative h-full">
            {board && <Board board={board} />}
        </div>
    );
};
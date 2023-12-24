import app from "../firebase";
import { useEffect, useState } from "react";
import Toast from "../Components/Toast";
import Board from "../Components/Board";
import { useParams } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore/lite';


export default function(){

    const { id } = useParams();
    const db = getFirestore(app);
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState();

    useEffect(()=>{
        async function getData(){
            const docRef = doc(db, 'boards', id);
            try{
                const docSnapshot = await getDoc(docRef);
                setBoard(docSnapshot.data());
                setLoading(false);
            }catch{
                setMessage('There has been an error fetching the data. Please try again.');
                setLoading(false);
                setError(true);
                setTimeout(()=>{
                    setError(false)
                },5000);
            };            
        };    
        getData();
    },[]);

    return(
        <div className="w-screen relative h-full relate">
            {loading && <p className='mt-[300px] text-slate-300 tracking-wide text-[18px] font-semibold'>Loading</p>}
            {!loading && board && <Board board={board} />}
            {error && <Toast message={message} />}
        </div>
    );
};
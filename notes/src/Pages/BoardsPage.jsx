import { useState } from 'react';
import { useEffect } from 'react';
import {app} from '../firebase.js';
import Boards from '../Components/Boards';
import StarredBoards from '../Components/StarredBoards';
import NewBoardModal from '../Components/NewBoardModal';
import { getFirestore, collection, getDocs, doc, addDoc, updateDoc, query, where } from 'firebase/firestore/lite';
import Toast from '../Components/Toast.jsx';
import { useUserAuth } from '../Context/authContext.jsx';


export default function BoardsPage(){

  //console.log(user);
  
  const db = getFirestore(app);

  const { user } = useUserAuth();
  console.log(user)


  const [boards, setBoards] = useState([]);
  const [starredBoards, setStarredBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  function handleEdit(id, name, comment){

    try{
      const docRef = doc(db, 'boards', id);
      updateDoc(docRef, {
        name: name,
        comment: comment
      });
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          if(board.id === id){
            return { ...board, name: name, comment: comment };
          }else{
            return board;
          }
        });
      });
    }catch{
      setMessage('There has been an error updating this board. Please try again');
      setError(true);
      setTimeout(()=>{
        setError(false);
      },5000);
    };
  };

  useEffect(()=>{

    async function getData(){
      
      
      try{
        const colRef = collection(db, 'boards');
        const docs = await getDocs(colRef);
        const data = docs.docs.map((doc)=>{
          return {...doc.data(), id: doc.id};
        });
        /*const colRef = collection(db, 'boards');
        const q = query(colRef, where('userId', '==',user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc)=>{
          return {...doc.data(), id: doc.id};
        });*/
        setLoading(false);
        setBoards(data);  
        setStarredBoards(data.filter((board)=>{
          if(board.starred){
            return true;
          };
        }));
      }catch(error){
        setMessage('There has been an error fetching the data, please try again.')
        setError(true);
        setLoading(false);
        setTimeout(()=>{
          setError(false);
        },5000);
      };
    };

    getData();
    
  },[]);

  function handleStarred(id, name, starred, listItems){

    try{
      const docRef = doc(db, 'boards', id);
      updateDoc(docRef, {
        starred: true
      });
      if(!starred){
        setStarredBoards([...starredBoards, {id: id, name: name, starred: starred, listItems: listItems}]);
        setBoards((prevBoards) => {
          return prevBoards.map((board) => {
            if(board.id === id){
              return { ...board, starred: true };
            }else{
              return board;
            }
          });
        });
      };
    }catch{
      setMessage('There has been an error updating this board. Please try again');
      setError(true);
      setTimeout(()=>{
        setError(false);
      },5000);
    };
  };

  function handleUnstar(id){

    try{
      const docRef = doc(db, 'boards', id);
      updateDoc(docRef, {
        starred: false
      });
      setStarredBoards(starredBoards.filter((board)=>{
        if(board.id === id){
          return false;
        };
        return true;
      }));
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          if(board.id === id){
            return { ...board, starred: false };
          }else{
            return board;
          };
        });
      });
    }catch{
      setMessage('There has been an error updating this board. Please try again');
      setError(true);
      setTimeout(()=>{
        setError(false);
      },5000);
    };    
  };

  function handleHideModal(){
    setShowModal(false);
  };

  async function handleNewBoard(name, comment){
    try{
      await addDoc(collection(db, 'boards',),{
        name: name,
        starred: false,
        listItems: [],
        comment: comment
      });
      setBoards([...boards, { name: name, listItems: [], starred: false}]);
    }catch(error){
      setMessage('There has been an error while performing this operation, please try again.')
      setError(true);
      setTimeout(()=>{
        setError(false);
      },5000)
    }
    
  };

  return (
    <div className="App flex flex-col">
        <StarredBoards handleEdit={handleEdit} starredBoards={starredBoards} handleUnstar={handleUnstar} />
        <Boards boardList={boards} handleEdit={handleEdit} handleUnstar={handleUnstar} handleStarred={handleStarred} />
        {loading && <p className='text-slate-300 tracking-wide text-[18px] font-semibold'>Loading...</p>}
        {showModal && <NewBoardModal handleNewBoard={handleNewBoard} handleHideModal={handleHideModal} />}
        <div className="mt-[30px] ml-auto mr-[25px]">
                <button onClick={()=>{setShowModal(true)}} className="px-[25px] text-slate-200 bg-emerald-400 py-[10px] shadow-sm">Add new board</button>
        </div>
        {error && <Toast message={message} />}
    </div>
  );
};
import { useState } from 'react';
import { useEffect } from 'react';
import app from '../firebase.js';
import Boards from '../Components/Boards';
import StarredBoards from '../Components/StarredBoards';
import NewBoardModal from '../Components/NewBoardModal';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export default function BoardsPage(){

  const db = getFirestore(app);

  const [boards, setBoards] = useState([]);
  const [starredBoards, setStarredBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{

    async function getData(){
      const colRef = collection(db, 'boards');
      const docs = await getDocs(colRef);
      const data = docs.docs.map((doc)=>{
        return doc.data();
      });
      
      console.log(data);

      setBoards(data);  
      setStarredBoards(data.filter((board)=>{
        if(board.starred){
          return true;
        };
      }));
    };

    getData();
    
  },[]);

  function handleStarred(id, name, starred, listItems){

    //update the starred value in the backend.

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
  };

  function handleUnstar(id){

    //update the starred value in the backend.

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
        }
      });
    });
  };

  function handleHideModal(){
    setShowModal(false);
  };

  function handleNewBoard(name){

    //save the new board in the backend

    setBoards([...boards, {id: 10, name: name, listItems: [], starred: false}]);
  };

  return (
    <div className="App flex flex-col">
        <StarredBoards starredBoards={starredBoards} handleUnstar={handleUnstar} />
        <Boards boardList={boards} handleUnstar={handleUnstar} handleStarred={handleStarred} />
        {showModal && <NewBoardModal handleNewBoard={handleNewBoard} handleHideModal={handleHideModal} />}
        <div className="mt-[30px] ml-auto mr-[25px]">
                <button onClick={()=>{setShowModal(true)}} className="px-[25px] text-slate-200 bg-emerald-400 py-[10px] shadow-sm">Add new board</button>
        </div>
    </div>
  );
};
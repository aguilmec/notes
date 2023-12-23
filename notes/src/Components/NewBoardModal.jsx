import { useState } from "react";

export default function NewBoardModal({ handleHideModal, handleNewBoard }){

    const [value, setValue] = useState('');
    const [comment, setComment] = useState('');

    return(
        <div className="fixed inset-0 flex items-center justify-center z-1">
            <div className="bg-black absolute inset-0 opacity-40"></div>
            <div className="flex flex-col bg-white px-2 py-8 shadow z-10 w-4/6">
                <p className="cursor-default text-[18px] font-semibold mb-[35px]">New Board</p>
                <div className="flex gap-[20px] justify-center">
                    <p className="text-md cursor-default">Name:</p>
                    <input onChange={(e)=>{
                        setValue(e.target.value)
                    }} type="text" placeholder="Board's name..." className="w-4/6 pl-[15px] border-solid border-slate-300 border-[1px]"></input>
                </div>
                <div className="flex mx-auto h-[25px] gap-x-[20px] mt-[35px]">
                    <button onClick={()=>{handleHideModal()}} className="bg-red-500 hover:bg-red-600 text-white px-4">
                        Cancel
                    </button>
                    <button onClick={()=>{
                        handleNewBoard(value);
                        setValue('');
                        handleHideModal();
                    }} className="bg-green-500 hover:bg-green-600 text-white px-4">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};
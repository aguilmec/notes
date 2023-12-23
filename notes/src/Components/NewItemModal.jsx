import { useState } from "react";

export default function NewItemModal({ handleClose, handleNewItem }){

    const [value, setValue] = useState('');

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black absolute inset-0 opacity-40"></div>
            <div className="flex flex-col bg-white px-2 py-8 shadow z-10 w-4/6">
                <p className="cursor-default text-[18px] font-semibold mb-[35px]">New Board</p>
                <div className="flex gap-[20px] justify-center">
                    <p className="text-md cursor-default">Item:</p>
                    <input onChange={(e)=>{setValue(e.target.value)}} type="text" placeholder="Item..." className="w-4/6 pl-[15px] border-solid border-slate-300 border-[1px]"></input>
                </div>
                <div className="flex mx-auto h-[25px] gap-x-[20px] mt-[35px]">
                    <button onClick={()=>{handleClose()}} className="bg-red-500 hover:bg-red-600 text-white px-4">
                        Cancel
                    </button>
                    <button onClick={()=>{
                        handleNewItem(value);
                        handleClose();}} className="bg-green-500 hover:bg-green-600 text-white px-4">
                        Add
                    </button>
                </div>
            </div>
    </div>
    );
};
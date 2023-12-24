import BoardPreview from "./BoardPreview";
import { useEffect, useState } from "react";

export default function Boards({ boardList, handleStarred, handleUnstar, handleEdit }){

    const [hiddenBoards, setHiddenBoards] = useState(true);

    return(
        <div className="w-fullflex flex-col text-slate-300">
            <div className="flex w-full mt-[20px] px-[20px] gap-[20px]">
                <button onClick={()=>{setHiddenBoards(!hiddenBoards)}} className="shrink-0 font-bold text-[18px]">My boards</button>
                <div className="my-auto w-full h-[1px] bg-slate-300"></div>
            </div>
            {
                hiddenBoards && (
                    <div className="grid grid-cols-3 gap-[20px] px-[25px] mt-[25px]">
                        {boardList.map((board)=>{                          
                            return(
                                <BoardPreview key={board.id} handleUnstar={handleUnstar} handleStarred={handleStarred} starred={board.starred} name={board.name} id={board.id} listItems={board.listItems} comment={board.comment} handleEdit={handleEdit} />
                            );
                        })}
                    </div>
                )
            }
        </div>
    );
}

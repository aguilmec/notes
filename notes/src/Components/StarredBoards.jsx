import BoardPreview from "./BoardPreview";
import { useState } from "react";

export default function StarredBoards({ starredBoards, handleUnstar }){

    const [hiddenStarred, setHiddenStarred] = useState(false);

    return(
        <div className="w-full flex flex-col text-slate-300">
            <div className="flex w-full mt-[20px] px-[20px] gap-[20px]">
                <button onClick={()=>{setHiddenStarred(!hiddenStarred)}} className="shrink-0 font-bold text-[18px]">Starred boards</button>
                <div className="my-auto w-full h-[1px] bg-slate-300"></div>
            </div>
            {
                hiddenStarred && (
                    <div className="grid grid-cols-3 gap-[20px] px-[25px] mt-[25px]">
                        {starredBoards.map((board)=>{
                            return(
                                <BoardPreview key={board.id} handleUnstar={handleUnstar} starred={true} name={board.name} id={board.id} listItems={board.listItems} />
                            );
                        })}
                    </div>
                )
            }
        </div>
    );
}
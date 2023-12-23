import { FaRegStar, FaStar } from "react-icons/fa";
import { PiGearBold } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";


export default function BoardPreview({id, name, listItems, starred, handleStarred, handleUnstar}){
    
    return(
        <div className="flex flex-col bg-white text-slate-800 px-[15px] py-[10px] gap-y-[120px]">
            <div className="flex place-content-between">
                <p className="cursor-default text-[18px] font-semibold">{name}</p>
                <div className="flex gap-[20px]">
                    
                    {starred ? 
                        <button onClick={()=>{
                            handleUnstar(id);
                        }}>
                            <FaStar className="text-xl" />
                        </button> : 
                        <button onClick={()=>{
                            
                            handleStarred(id, name, starred, listItems);
                        }}>
                            <FaRegStar className="text-xl" />    
                        </button>}
                    
                    <button>
                        <PiGearBold className="text-xl"/>
                    </button>
                </div>
            </div>
            <div className="flex place-content-between">
                <div className="flex gap-[2px]">
                    <CiBoxList className="text-xl my-auto" />
                    <p className="cursor-default my-auto">{listItems.length}</p>
                </div>
                <button value={id} onClick={()=>{}}>
                    <a href={`/board/${id}`}>More</a>
                </button>
            </div>
        </div>
    );
}
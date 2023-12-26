import { IoMenu, IoSearch, IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../Context/authContext";

export default function Navbar({children}){

    const { user, logout } = useAuth();
    console.log(user);

    return(
        <div className="flex w-screen flex-col">
            <div className="px-[20px] flex w-full h-[50px] bg-slate-900 justify-between">
                <div className="text-4xl text-slate-200 my-auto">
                    <button>
                        <IoMenu />
                    </button>
                </div>
                <div className="my-[auto] shrink-0 flex">
                    <input className=" rounded-l-md text-slate-200 bg-slate-800 h-[30px] pl-[12px]" placeholder="Search..." type="text"/>
                    <button className="bg-slate-800 h-[30px] ml-[-1px] rounded-r-md pr-[8px] flex text-slate-200">
                        <IoSearch className="mx-auto my-auto"/>
                    </button>
                </div>
                <div className="text-slate-200 my-auto font-bold  cursor-default">
                    Do
                </div>
                <div className="text-slate-200 my-auto my-auto">
                    <button onClick={()=>{logout()}} className="text-slate-200 text-2xl">
                        <IoLogOutOutline />
                    </button>
                </div>
                
            </div>
            <div className="w-screen flex flex-col">
                {children}
            </div>
        </div>
        
    );
}
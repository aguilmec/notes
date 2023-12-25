import { useState } from "react";
import app from "firebase/firestore/lite";

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(){

    };

    return(
        <div className="flex flex-col w-5/12 mx-auto my-[250px] bg-slate-900 px-[80px] py-[25px] gap-y-[40px] rounded-sm">
            <p className="cursor-default text-slate-300 text-[22px] font-semibold tracking-wide">Login</p>
            <div className="flex flex-col gap-y-[15px]">
                <p className="cursor-default text-slate-300">Email:</p>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="pl-[8px] py-[2px]" placeholder="username..."></input>
            </div>
            <div className="flex flex-col gap-y-[15px]">
                <p className="cursor-default text-slate-300">Password:</p>
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="pl-[8px] py-[2px]" placeholder="password..."></input>
            </div>
            <div className="flex flex-col gap-y-[15px]">
                <button onClick={()=>{login()}} className="mx-auto px-[20px] bg-green-500 hover:bg-green-600 text-white px-[25px] py-[5px] w-fit">Login</button>
                <a className="cursor-pointer hover:text-slate-400 text-slate-500">Don't have an account? Click here to register.</a>
            </div>
        </div>
    );

};
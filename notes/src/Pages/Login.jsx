import { useState } from "react";
import Toast from "../Components/Toast.jsx";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../Context/authContext.jsx";

export default function Login(){

    const { signIn } = useUserAuth();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function callLogin(){
        try{
            await signIn(user.email, user.password);
            navigate('/');
        }catch(error){
            if(error.code === 'auth/invalid-email'){
                setMessage('Error: please enter a valid email.');
            }else if(error.code === 'auth/email-already-in-use'){
                setMessage('Error: email already in use.');
            }else{
                setMessage('An error has ocurred while performing this operation.');
            };
            setError(true);
            setTimeout(()=>{
                setError(false);
            },5000);            
        };
    };

    return(
        <div className="flex flex-col w-5/12 mx-auto my-[250px] bg-slate-900 px-[80px] py-[25px] gap-y-[40px] rounded-sm relative">
            <p className="cursor-default text-slate-300 text-[22px] font-semibold tracking-wide">Login</p>
            <div className="flex flex-col gap-y-[15px]">
                <p className="cursor-default text-slate-300">Email:</p>
                <input onChange={(e)=>{setUser({...user, email:  e.target.value})}} className="pl-[8px] py-[2px]" placeholder="username..."></input>
            </div>
            <div className="flex flex-col gap-y-[15px]">
                <p className="cursor-default text-slate-300">Password:</p>
                <input type="password" onChange={(e)=>{setUser({...user, password: e.target.value})}} className="pl-[8px] py-[2px]" placeholder="password..."></input>
            </div>
            <div className="flex flex-col gap-y-[15px]">
                <button onClick={()=>{callLogin()}} className="mx-auto px-[20px] bg-green-500 hover:bg-green-600 text-white px-[25px] py-[5px] w-fit">Login</button>
                <p className="cursor-pointer hover:text-slate-400 text-slate-500"><button onClick={()=>{navigate('/signup')}}>Don't have an account? Click here to register.</button></p>
            </div>
            {error && <Toast message={message} />}
        </div>
    );

};
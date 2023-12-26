import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

export const authContext = createContext(null);

export function useAuth(){
    const context = useContext(authContext);
    return context;
};

export function AuthProvider({children}){

    const [user, setUser] = useState(null);

    async function signup(user){
        await createUserWithEmailAndPassword(auth, user.email, user.password);
    };

    async function login(user){
        await signInWithEmailAndPassword(auth, user.email, user.password);
    };

    async function logout(){
        signOut(auth);
    };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        });
        return ()=> unsubscribe(); 
    },[]);

    return(
        <authContext.Provider value={{signup, login, logout,user}}>
            {children}
        </authContext.Provider>
    );
};
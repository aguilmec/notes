import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";
import { auth } from "../firebase";

const userContext = createContext(null);

export default function AuthContextProvider({ children }){

    const [user, setUser] = useState({});

    function signUp(email, password){
        return  createUserWithEmailAndPassword(auth, email, password);
    };

    function signIn(email, password){
        return  signInWithEmailAndPassword(auth, email, password);
    };

    function logout(){
        return signOut(auth);
    };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        });
        return ()=> unsubscribe();
    },[]);

    return(
        <userContext.Provider value={{ signUp, signIn, logout, user }}>
            {children}
        </userContext.Provider>
    );
};

export function useUserAuth(){
    return useContext(userContext);
};
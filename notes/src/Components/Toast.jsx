export default function Toast({ message }){
    return(
        <div className="bg-red-500 text-slate-300 text-[16px] z-50 fixed bottom-[0px] right-[25px] px-[30px] py-[8px] rounded-tr-sm rounded-tl-sm">
            {message}
        </div>
    );
};
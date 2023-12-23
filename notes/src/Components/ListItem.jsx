export default function ListItem({ item }){
    return(
        <div className="bg-white shadow-md rounded-sm px-[15px] py-[10px]">
            <p className="text-left tracking-wide cursor-default text-[16px] text-slate-800">{item}</p>
            <p className="text-left cursor-default text-[13px] text-slate-600">Tag</p>
        </div>
    );
}
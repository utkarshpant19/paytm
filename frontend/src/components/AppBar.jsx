export function AppBar({username}){

    return (
        <>
        <div className="border-b-2 flex justify-between m-4 p-4">
            <h1 className="font-extrabold text-xl">PayTM App</h1>
            <div className="flex gap-2 items-center">
                <h2 className="font-medium text-lg">Hello, {username}</h2>
                <div className="w-8 h-8 font-medium text-wrap text-white p-2 relative bg-[#33691e] rounded-full"><span className="absolute bottom-[5px] left-3">{username.toString().charAt(0)}</span></div>
            </div>
        </div>
        </>
    )

}
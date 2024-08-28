export function Balance({balance}){


    return (
        <>
        <div className="mx-4 p-4">
            <h2 className="font-bold text-lg">{`Your Balance:  ₹${balance}`}</h2>
        </div>
        </>
    )
}
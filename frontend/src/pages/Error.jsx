import { useRouteError } from "react-router-dom"

export function Error(){

    const error = useRouteError();

    return (
        <div className="h-screen">
            <div className="h-full flex justify-center items-center gap-4">
            <h1 className="text-2xl font-bold"> Oops! Something went wrong !!!</h1>
            <p>{error.statusText || error.message}</p>
            </div>
        </div>
    )
}
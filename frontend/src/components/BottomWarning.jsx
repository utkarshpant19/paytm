import { Link } from "react-router-dom";

export function BottomWarning({text, linkText, to}){

    return (
        <div>
            <h1 className="font-medium text-sm inline-block">{text} </h1>
            <Link to={to} className="underline font-medium text-sm"> {linkText}</Link>
        </div>
    )
}
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function User({ user }) {

    const navigate = useNavigate();
    console.log('Receiver ',user);

  return (
    <>
      <div className="flex justify-between mx-4 p-2 items-center">
        <div className="flex gap-2">
          <div className="w-8 h-8 ml-3 font-medium text-wrap text-white p-2 relative bg-[#33691e] rounded-full">
            <span className="absolute bottom-[5px] left-3">
              {user.firstName[0].toUpperCase()}
            </span>
          </div>
          <h2 className="text-lg font-bold">{user.firstName}</h2>
        </div>
        <Button onClick={()=>{
            navigate('/send-money?name='+user.firstName+'&id='+user.userId);
        }} text={"Send Money"}/>
      </div>
    </>
  );
}

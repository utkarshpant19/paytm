import { useEffect, useState } from "react";
import { User } from "./User";
import axios from "axios";

export function Users() {

  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState([]);
  console.log('User in Users ',contacts);

  useEffect(()=>{

    axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter, {
      headers: {
        Authorization: localStorage.getItem('authToken')
      }
    }).then((response)=>{
      setContacts(response.data.user);
    })
  }, [filter])

  return (
    <>
      <div className="w-full">
        <div className="w-[96%] mx-auto">
          <h1 className="text-lg font-bold">Users</h1>        
            <input
              className="w-full my-2 p-2 border rounded border-slate-500"
              placeholder="Search Users..."
              onChange={(e)=>{
                setFilter(e.target.value)
              }}
            ></input>   
        </div>

        {contacts.map((user, idx)=> <User key={user.username} user={user}/>)}
      </div>
    </>
  );
}

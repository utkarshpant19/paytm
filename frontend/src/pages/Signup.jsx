import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { useState } from "react";
import axios from 'axios';
import toastr from 'toastr';
import { useNavigate } from "react-router-dom";


export function Signup() {

  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[username, setUserName] = useState("");
  const[password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = async ()=>{

    const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
      firstName,
      lastName,
      username,
      password
    });

    console.log('Signup Response ',res);
    if(res.data.token){
      localStorage.setItem('token', res.data.token)
      toastr.success = res.data.message
      navigate('/signin');
    }
    
  }

  return (
    <div className="h-screen">
      <div className="bg-[#7f7f7f] flex justify-center items-center h-full">
        <div className="bg-white rounded-md">
          <div className="max-w-[20rem] flex justify-center flex-col items-center p-4">
            <Heading title={"Sign Up"} />
            <SubHeading title={"Enter your information to create an account"} />

            <Input onChange={(e)=> {
              setFirstName(e.target.value);
            }} label={"First Name"} type={"text"} placeholder={"John"} />
            <Input onChange={ (e)=> {
              setLastName(e.target.value);
            }} label={"Last Name"} type={"text"} placeholder={"Doe"} />
            <Input
              label={"Email"}
              type={"email"}
              placeholder={"johndoe@example.com"}
              onChange={(e)=> {
                setUserName(e.target.value);
              }}
            />
            <Input onChange={(e)=>{
              setPassword(e.target.value);
            }} label={"Password"} type={"password"} />
            <div className="my-3">
              <Button onClick={(e)=> signup(e)} text={"Sign Up"} />
            </div>

            <BottomWarning
              text={"Already have an account ?"}
              linkText={"Login"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

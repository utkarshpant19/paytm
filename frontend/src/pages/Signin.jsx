import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      {
        username,
        password,
      }
    );
  
    const {token, user} = response.data;
    localStorage.setItem('authToken', `Bearer ${token}`);
    navigate("/dashboard", {state: user})


    console.log(response.data);
  };

  const onEnter = async (e)=>{
    if(e.key == 'Enter'){
      await signIn();
    }
  }

  return (
    <div className="h-screen">
      <div className="bg-[#7f7f7f] flex justify-center items-center h-full">
        <div className="bg-white rounded">
          <div className="flex justify-center flex-col items-center p-4">
            <Heading title={"Sign In"} />
            <SubHeading title={"Enter your credentials to your account"} />
            <Input
              label={"Email"}
              type={"email"}
              placeholder={"johndoe@example.com"}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <Input label={"Password"} 
            type={"password"} 
            onChange={(e)=> {
              setPassword(e.target.value);
            }}
            onEnter={onEnter}
            
            />

            <div>
              <Button onClick={signIn} text={"Sign In"} />
            </div>

            <BottomWarning
              text={"Don't have an account ?"}
              linkText={"Sign Up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

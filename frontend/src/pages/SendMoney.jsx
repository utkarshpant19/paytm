
import axios from "axios";
import { Card } from "../components/Card";
import { Heading } from "../components/Heading";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export function SendMoney({ receiver }) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [amount, setAmount] = useState(0);
    const name = searchParams.get('name')
    const id = searchParams.get('id')
    console.log('Params ',name);

    function transferMoney(){

        const config = {
            method: 'post',
            url: 'http://localhost:3000/api/v1/account/transfer',
            headers: {
                Authorization: localStorage.getItem('authToken')
            },
            data: {
                to: id,
                amount
            }
        }
        axios.request(config).then((res)=>{
            console.log(res.data);
        })
    }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Card>
          <div className="flex h-full flex-col justify-between items-center gap-6 ">
            <div className="flex justify-center">
              <Heading title={"Send Money"} />
            </div>

            <div className="my-4 w-4/5">
              <div className="flex gap-2">
                <div className="w-8 h-8 font-medium text-wrap text-white p-2 relative bg-[#39801d] rounded-full">
                  <span className="absolute bottom-[5px] left-3">{name[0].toUpperCase()}</span>
                </div>
                <h1 className="text-lg font-bold">{name}</h1>
              </div>
              <div className="w-full flex flex-col gap-2 mb-4">
                <strong className="text-sm">Amount (in Rs)</strong>
                <input
                  type="number"
                  className="block rounded-md border w-full py-2 pl-2"
                  placeholder={"Enter Amount"}
                  onChange={(e)=>{
                    setAmount(e.target.value)
                  }}
                />
                <button onClick={transferMoney} className="w-full rounded-md bg-[#39801d] text-white text-sm font-medium py-2 pl-2">
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

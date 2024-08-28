import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";


export function Dashboard() {

  return (

    <>
      <div>
        <AppBar username={"Utkarsh"} />
        <Balance balance={"4000"}/>
        <Users/>
      </div>
    </>
  );
}

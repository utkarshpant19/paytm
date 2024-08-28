

export function Card({children}) {

    console.log('Card Children ',children);
  return (
    <>
      <div className="bg-white w-[25rem] h-[25rem] border rounded-md shadow-md">
       {children}
      </div>
    </>
  );
}

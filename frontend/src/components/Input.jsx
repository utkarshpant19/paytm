export function Input({ label, type, placeholder, onChange, onEnter }) {
  return (
    <div className="w-full mx-auto my-2">
      <label className="my-2 font-bold">{label}</label>
      <input onKeyDown={onEnter} onChange={onChange} className="block rounded border w-full py-2 pl-2" type={type} placeholder={placeholder} />
    </div>
  );
}

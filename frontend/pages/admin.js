import Link from "next/link";

export default function admin() {
  return (
    <div className="flex flex-col justify-center align-center text-center py-10  h-[50vh] my-6">
      <div className="flex flex-col">
        <h3 className="text-left w-[250px] mx-auto text-xl">Username</h3>
        <input className="w-[250px] mx-auto mt-2 text-black p-1 rounded-[8px]" />
        <h3 className="text-left w-[250px] mx-auto text-xl mt-3">Password</h3>
        <input
          type="password"
          className="w-[250px] mx-auto mt-2 text-black p-1 rounded-[8px]"
        />
        <button className="mx-auto mt-7 w-[250px] text-white bg-blue-500 p-2">
          <Link href="/adminPortal">Submit</Link>
        </button>
      </div>
    </div>
  );
}

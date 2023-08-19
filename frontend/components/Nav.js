import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export default function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex flex-col justify-between items-center py-10 md:flex-row z-0 mx-14">
      <Link href="/">
        <h2 className="hidden md:block cursor-pointer text-2xl font-extrabold">
          EMPLOYO
        </h2>
      </Link>

      <ul className="flex items-center gap-10 ">
        <Link href="/dashboard">
          <a className=" text-sm md:text-lg font-medium" href="#">
            Dashboard
          </a>
        </Link>
        {!user && (
          <Link href="/auth/login">
            <a className="py-2 px-4 text-lg bg-black text-white rounded-lg font-medium ml-8">
              Sign In
            </a>
          </Link>
        )}
        {user && (
          <div>
            <img
              referrerPolicy="no-referrer"
              className="w-12 rounded-full"
              src={user.photoURL}
              alt=""
            />
          </div>
        )}
      </ul>
    </nav>
  );
}

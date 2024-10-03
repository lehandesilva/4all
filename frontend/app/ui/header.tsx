import FourallLogo from "./4all-logo";
import SearchBox from "./searchBox";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { cookies } from "next/headers";

export default async function Header() {
  const result = cookies().get("token") ? true : false;
  return (
    <>
      <div className="w-full h-20 flex items-center justify-between">
        <div className="w-36 justify-self-start">
          <FourallLogo />
        </div>
        <div className="flex items-center justify-evenly w-[35rem] bg-p-2 rounded-full h-12">
          <SearchBox />
          <Link href="/" className="pl-5 text-s-3">
            Home
          </Link>
          <Link href="/" className="pl-12 text-s-3">
            Categories
          </Link>
        </div>
        <div className="w-36 flex justify-end pr-10">
          <Link href={result ? "/profile" : "/login"}>
            {result ? (
              <FaUser className="text-s-3 text-3xl outline outline-1 rounded-full outline-s-3 outline-offset-4" />
            ) : (
              <button className="px-4 py-2 bg-s-1 rounded-full text-s-3 ml-12">
                Login
              </button>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

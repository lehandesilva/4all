"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBox() {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // const searchHandler = useDebouncedCallback((term: string) => {
  //   const params = searchParams.get("query");
  //   if (term) {
  //     params.set("query", term);
  //   } else {
  //     params.delete("query");
  //   }
  //   if (pathname === "/search") {
  //     replace(`${pathname}?${params.toString()}`);
  //   } else {
  //     replace(`${pathname}search?${params.toString()}`);
  //   }
  // }, 2000);

  return (
    <div className="bg-p-3 rounded-full flex h-8">
      <div className="w-4 m-2">
        <FaMagnifyingGlass className="text-s-3" />
      </div>
      <input
        type="text"
        className="outline-0 bg-transparent px-2 text-lg"
        placeholder="Search"
        // onChange={(e) => {
        //   searchHandler(e.target.value);
        // }}
        // defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
